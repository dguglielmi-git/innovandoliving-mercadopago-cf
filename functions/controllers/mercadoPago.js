const { MercadoPagoConfig, Preference } = require('mercadopago')
const Order = require('../models/order')
const Owner = require('../models/owner')
const OrderStatus = require('../models/orderStatus')
const jwt = require('jsonwebtoken')
const {
  ORDER_PROCESSED,
  ORDER_FINISHED,
  BUSINESS_NAME,
  MSG_READ,
  MSG_UNREAD,
  IS_OWNER,
  ORDER_PENDING_PAYMENT,
  PAYMENT_METHOD_CREDIT_CARD,
  NOT_ITEMS_RECEIVED,
  APPROVED_STATUS,
  REQUEST_WITHOUT_TOKEN,
  INSUFFICIENT_PRIVILEGES,
  ORDER_SUCCESSFULLY_REMOVED,
  ORDER_ID_NOT_FOUND,
  ERROR_SAVING_ORDER,
  MERCADOPAGO_CREDIT_CARD,
  ERROR_UPDATING_ORDER,
  GENERIC_ERROR_MSG,
  GENERIC_ERROR_DETAILED,
  ORDER_WITHOUT_PENDING_BALANCE,
  ERROR_ADDING_MSG_ORDER,
  ERROR_UPDATE_ORDER,
  ERROR_RETRIEVING_MSGS_ORDER
} = require('../utils/constants')
const { HTTP_UNAUTHORIZED, HTTP_NOT_FOUND } = require('../utils/httpCode')

const client = new MercadoPagoConfig({ access_token: process.env.ACCESS_TOKEN })

const mercadoPagoCheckout = (req, res) => {
  const { items } = req.body

  if (items === undefined) {
    res.status(HTTP_NOT_FOUND)
    res.send(JSON.stringify({ error: NOT_ITEMS_RECEIVED }))
  } else {
    const preference = new Preference(client)
    preference
      .create({
        back_urls: {
          failure: process.env.URL_FAILURE_PAYMENT,
          pending: process.env.URL_PENDING_PAYMENT,
          success: process.env.URL_SUCCESSFUL_PAYMENT
        },
        auto_return: APPROVED_STATUS,
        statement_descriptor: BUSINESS_NAME,
        items
      })
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }
}

const mercadoPagoRemoveOrder = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)

    const owner = await Owner.findOne({}).where({ userOwnerId: id })
    if (!owner) {
      return res.status(HTTP_UNAUTHORIZED).json({
        error: INSUFFICIENT_PRIVILEGES
      })
    }

    const order = await Order.findOne({ paymentId: req.params.id })

    if (order) {
      await order.remove()
      return res.json({
        result: ORDER_SUCCESSFULLY_REMOVED
      })
    }
    return res.status(HTTP_NOT_FOUND).json({
      response: ORDER_ID_NOT_FOUND
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_NOT_FOUND).json({
      error: error
    })
  }
}

const mercadoPagoSaveOrder = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const order = new Order(req.body)
    order.userId = id

    order.status = ORDER_PENDING_PAYMENT
    order.status_history = {
      status: ORDER_PENDING_PAYMENT,
      modifiedBy: id
    }

    if (order.paymentMethodSelected !== PAYMENT_METHOD_CREDIT_CARD) {
      order.mercadoPagoMerchantOrderId = Math.random()
        .toString(36)
        .slice(3)
        .toUpperCase()
    }

    await order.save()
    return res.json(order)
  } catch (error) {
    console.log(error)
    return res.json({
      response: `${ERROR_SAVING_ORDER} ${error}`
    })
  }
}

const mercadoPagoUpdateOrder = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const order = await Order.findOne({}).where({
      userId: id,
      paymentId: req.body.orderPreferenceId
    })

    const mpType = req.body.mercadoPagoPaymentType
    const mpStatus = req.body.mercadoPagoStatus
    if (mpType === MERCADOPAGO_CREDIT_CARD && mpStatus === APPROVED_STATUS) {
      if (order.creditPending > 0) {
        order.creditReceived = parseFloat(order.creditPending)
        order.creditPending = 0
      }

      order.purchaseTotalReceived =
        parseFloat(order.creditReceived) + parseFloat(order.cashReceived)
      order.purchaseTotalPendingPayment =
        parseFloat(order.creditPending) + parseFloat(order.cashPending)
    }
    order.mercadoPagoStatus = req.body.mercadoPagoStatus
    order.mercadoPagoPaymentId = req.body.mercadoPagoPaymentId
    order.mercadoPagoPaymentType = req.body.mercadoPagoPaymentType
    order.mercadoPagoMerchantOrderId = req.body.mercadoPagoMerchantOrderId
    order.mercadoPagoProcessingMode = req.body.mercadoPagoProcessingMode
    await order.save()

    return res.json(order)
  } catch (error) {
    console.log(error)
    return res.json({
      response: `${ERROR_UPDATING_ORDER} ${error}`
    })
  }
}

const mercadoPagoGetOrderStatus = async (req, res) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const orderStatus = await OrderStatus.find()

    return res.json(orderStatus)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: GENERIC_ERROR_MSG
    })
  }
}

const mercadoPagoGetOrder = async (req, res) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const order = await Order.findOne({ _id: req.params.id }).where({
      userId: id
    })
    return res.json(order)
  } catch (error) {
    console.log(error)
    return res.status(HTTP_NOT_FOUND).json({
      error: `${GENERIC_ERROR_DETAILED} ${error} `
    })
  }
}

const mercadoPagoGetOrders = async (req, res) => {
  const token = req.header('x-token')
  const filter = req.header('active')

  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const owner = await Owner.findOne({}).where({ userOwnerId: id })

    let whereData = {}
    if (owner) {
      try {
        if (owner.userOwnerId === id) {
          whereData =
            filter == 'true'
              ? { status: { $ne: ORDER_FINISHED } }
              : { status: ORDER_FINISHED }
        } else {
          whereData = { userId: id }
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      whereData = { userId: id }
    }

    const orders = await Order.find({})
      .where(whereData)
      .sort({ dateCreated: -1 })
    return res.json(orders)
  } catch (error) {
    console.log(error)
    return res.status(HTTP_NOT_FOUND).json({
      error: `${GENERIC_ERROR_DETAILED} ${error}`
    })
  }
}

const checkUserOwner = async (req, res) => {
  const owner = await Owner.findOne({}).where({ userOwnerId: req.params.id })
  if (owner) {
    return res.json({ result: true })
  } else {
    return res.json({ result: false })
  }
}

const mercadoPagoUpdatePendingBalance = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const pendCash = req.body.pendingCash
    const pendOther = req.body.pendingOther

    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const owner = await Owner.findOne({}).where({ userOwnerId: id })

    if (owner) {
      const order = await Order.findOne({ _id: req.body.orderId })
      if (!!pendCash) {
        order.cashReceived = parseFloat(order.cashPending)
        order.cashPending = 0
      }
      if (!!pendOther) {
        order.creditReceived = parseFloat(order.creditPending)
        order.creditPending = 0
      }
      order.purchaseTotalReceived =
        parseFloat(order.creditReceived) + parseFloat(order.cashReceived)
      order.purchaseTotalPendingPayment =
        parseFloat(order.creditPending) + parseFloat(order.cashPending)

      if (parseFloat(order.purchaseTotalPendingPayment) === 0) {
        const newStat = await updateStatus(order, id, ORDER_PROCESSED)
        order.status = newStat.status
        order.history = newStat.status_history
        if (newStat.dateClosed) {
          order.dateClosed = newStat.dateClosed
        }
      }
      await order.save()
      return res.json(order)
    }

    return res.status(HTTP_UNAUTHORIZED).json({
      error: INSUFFICIENT_PRIVILEGES
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_NOT_FOUND).json({
      error: ORDER_WITHOUT_PENDING_BALANCE
    })
  }
}

const updateStatus = async (order, userId, newStatus) => {
  const tempOrder = order
  const history = tempOrder.status_history

  history.push({
    status: newStatus,
    modifiedBy: userId
  })

  tempOrder.status = newStatus
  tempOrder.status_history = history
  if (newStatus == ORDER_FINISHED) {
    tempOrder.dateClosed = Date.now()
  }

  return tempOrder
}

const mercadoPagoUpdateOrderStatus = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)

    let whereCondition = {}
    const owner = await Owner.findOne({}).where({ userOwnerId: id })
    if (!owner) {
      whereCondition = { userId: id }
    }

    const order = await Order.findOne({ _id: req.params.id }).where(
      whereCondition
    )

    if (order) {
      const updateOrder = await updateStatus(order, id, req.body.status)
      await updateOrder.save()
      return res.json(updateOrder)
    }
    return res.status(HTTP_NOT_FOUND).json({
      response: ORDER_ID_NOT_FOUND
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_UNAUTHORIZED).json({
      response: ERROR_ADDING_STATUS_HISTORY
    })
  }
}

const mercadoPagoAddMessageToOrder = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)

    let whereCondition = {}
    const owner = await Owner.findOne({}).where({ userOwnerId: id })
    if (!owner) {
      whereCondition = { userId: id }
    }

    const order = await Order.findOne({ _id: req.body.orderId }).where(
      whereCondition
    )

    if (order) {
      const msg = order.messages
      msg.push({
        username: req.body.username || BUSINESS_NAME,
        message: req.body.message,
        icon: req.body.icon || 'owner',
        msgread: req.body.msgread || 0,
        msgreadowner: req.body.msgreadowner || 0
      })
      order.messages = msg
      await order.save()
      return res.json(order)
    }
    return res.status(HTTP_NOT_FOUND).json({
      response: ORDER_ID_NOT_FOUND
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_UNAUTHORIZED).json({
      response: ERROR_ADDING_MSG_ORDER
    })
  }
}

const markAsRead = (userType, order) => {
  try {
    if (userType === IS_OWNER) {
      order.messages
        .filter(msg => msg.msgreadowner === MSG_UNREAD)
        .map(m => (m.msgreadowner = MSG_READ))
    } else {
      order.messages
        .filter(msg => msg.msgread === MSG_UNREAD)
        .map(m => (m.msgread = MSG_READ))
    }

    return order
  } catch (error) {
    throw new Error(`${ERROR_UPDATE_ORDER} ${error}`)
  }
}

const mercadoPagoMarkMessageAsRead = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)
    const order = await Order.findOne({ _id: req.params.id, user: id })

    if (order) {
      const orderModified = markAsRead(req.body.userType, order)
      await orderModified.save()
      return res.json(orderModified.messages)
    }
    return res.status(HTTP_NOT_FOUND).json({
      response: ORDER_ID_NOT_FOUND
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_UNAUTHORIZED).json({
      response: ERROR_RETRIEVING_MSGS_ORDER
    })
  }
}

const mercadoPagoGetMessagesByOrder = async (req, res) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(HTTP_UNAUTHORIZED).json({
      error: REQUEST_WITHOUT_TOKEN
    })
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETJWTKEY)

    const order = await Order.findOne({ _id: req.params.id, user: id })
    if (order) {
      return res.json(order.messages)
    }
    return res.status(HTTP_NOT_FOUND).json({
      response: ORDER_ID_NOT_FOUND
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_UNAUTHORIZED).json({
      response: ERROR_RETRIEVING_MSGS_ORDER
    })
  }
}

module.exports = {
  mercadoPagoCheckout,
  mercadoPagoSaveOrder,
  mercadoPagoUpdateOrder,
  mercadoPagoAddMessageToOrder,
  mercadoPagoGetOrder,
  mercadoPagoGetOrders,
  mercadoPagoMarkMessageAsRead,
  mercadoPagoGetMessagesByOrder,
  markAsRead,
  checkUserOwner,
  mercadoPagoUpdateOrderStatus,
  mercadoPagoGetOrderStatus,
  mercadoPagoUpdatePendingBalance,
  mercadoPagoRemoveOrder
}
