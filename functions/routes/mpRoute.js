const { Router } = require("express");
const { fieldValidator } = require("../middlewares/fieldValidators");
const {
    mercadoPagoGetOrder,
    mercadoPagoCheckout,
    mercadoPagoGetOrders,
    mercadoPagoSaveOrder,
    mercadoPagoUpdateOrder,
    mercadoPagoAddMessageToOrder,
    mercadoPagoMarkMessageAsRead,
    mercadoPagoGetMessagesByOrder,
    checkUserOwner,
    mercadoPagoUpdateOrderStatus,
    mercadoPagoGetOrderStatus,
    mercadoPagoUpdatePendingBalance,
    mercadoPagoRemoveOrder,
} = require("../controllers/mercadoPago");
const {
    addChatMessageForProduct,
    replyMessageChat,
    chatMarkMessageAsRead,
    getMessagesByProduct,
    getOpenChats,
    getUnreadMsg } = require("../controllers/chat");
const { newAuditRegister } = require("../controllers/audit");

const router = Router();

// [GET]
router.get("/order/:id", [fieldValidator], mercadoPagoGetOrder);
router.get("/orders", [fieldValidator], mercadoPagoGetOrders);
router.get("/order/messages/:id", [fieldValidator], mercadoPagoGetMessagesByOrder)
router.get("/userowner/:id", [fieldValidator], checkUserOwner)
router.get("/orderstatus", [fieldValidator], mercadoPagoGetOrderStatus);
router.get("/chat/messages/:productId/:userId", [fieldValidator], getMessagesByProduct);
router.get("/chat/open", [fieldValidator], getOpenChats);
router.get("/chat/unreadmsg", [fieldValidator], getUnreadMsg);

// [POST]
router.post("/payment", [fieldValidator], mercadoPagoCheckout);
router.post("/order", [fieldValidator], mercadoPagoSaveOrder);
router.post("/order/message", [fieldValidator], mercadoPagoAddMessageToOrder);
router.post("/chat", [fieldValidator], addChatMessageForProduct);
router.post("/audit", [fieldValidator], newAuditRegister);

// [PUT]
router.put("/order", [fieldValidator], mercadoPagoUpdateOrder);
router.put("/order/message/read/:id", [fieldValidator], mercadoPagoMarkMessageAsRead);
router.put("/order/status/:id", [fieldValidator], mercadoPagoUpdateOrderStatus);
router.put("/chat", [fieldValidator], replyMessageChat);
router.put("/chat/message", [fieldValidator], chatMarkMessageAsRead)
router.put("/order/balance/pending", [fieldValidator], mercadoPagoUpdatePendingBalance);

// DELETE
router.delete("/order/:id", [fieldValidator], mercadoPagoRemoveOrder);

module.exports = router;