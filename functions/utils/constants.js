// Move all these order's constant into the database
const MSG_UNREAD = 0;
const MSG_READ = 1;
const IS_OWNER = 1;
const IS_NORMAL_USER = 0;
const BUSINESS_NAME = "InnovandoLiving";
const ORDER_PROCESSED = 0;
const ORDER_PENDING_PAYMENT = 12;
const ORDER_FINISHED = 99;

const PAYMENT_METHOD_CREDIT_CARD = "creditcard";
const PAYMENT_METHOD_MERCADOPAGO = "mercadopago";
const API_ROUTER_PATH = "/api/mercadopago";

const REQUEST_WITHOUT_TOKEN = "Request without token.";
const GENERIC_ERROR_MSG = "Something went wrong.";
const GENERIC_ERROR_DETAILED = "Something went wrong - error: ";
const ERROR_ADDING_AUDIT_REGISTER =
  "Something went wrong when trying to add a new Audit register.";
const CHAT_ID_NOT_FOUND = "Chat ID not found or insufficient privileges.";
const CHAT_MSG_NOT_FOUND = "Chat message not found or insufficient privileges.";
const ERROR_RETRIEVING_MSGS =
  "Error when trying to retrieve messages for this chat. Please check the chat ID and permissions.";
const ERROR_ADDING_CHAT_MSG =
  "Error when trying to add a message to the Chat. Please check the chat ID and permissions.";
const ERROR_GET_UNREAD_MSGS = "Error getting unread messages.";
const ERROR_UPDATE_CHAT = "Error updating the chat: ";
const ERROR_UPDATE_ORDER = "Error updating the order: ";
const NOT_FOUND_VERIFY_PROD =
  "Not found. Please verify the product sent and try again.";
const NOT_ITEMS_RECEIVED = "No items received.";
const APPROVED_STATUS = "approved";
const MERCADOPAGO_CREDIT_CARD = "credit_card";
const INSUFFICIENT_PRIVILEGES = "Insufficient privileges.";
const ORDER_SUCCESSFULLY_REMOVED = "Order successfully removed.";
const ORDER_ID_NOT_FOUND = "Order ID not found or insufficient privileges.";
const ERROR_SAVING_ORDER =
  "Error when trying to save the order. Error message: ";
const ERROR_UPDATING_ORDER =
  "Error when trying to update the order. Error message: ";
const ORDER_WITHOUT_PENDING_BALANCE = "No pending balance for this order.";
const ERROR_ADDING_STATUS_HISTORY =
  "Error when trying to add a status to the history. Please check the order ID and permissions.";
const ERROR_ADDING_MSG_ORDER =
  "Error when trying to add a message to the order. Please check the order ID and permissions.";
const ERROR_RETRIEVING_MSGS_ORDER =
  "Error when trying to retrieve messages from the order. Please check the order ID and permissions.";
const DB_CONNECTION_SUCCESSFULLY = "DB connection successful.";
const ERROR_CONNECTING_DB = "Error connecting to the DB: ";
const SERVER_LISTENING_ON_PORT = "Server listening on port ";
const ERROR_SAVING_ADDRESS =
  "An error occurred when trying to save the Address.";
const ERROR_FINDING_ADDRESS = "An error occurred when finding an address.";
const ERROR_DELETING_ADDRESS =
  "An error occurred when trying to delete an address";
const UNAUTHORIZED_USER_ADDRESS_OPERATION =
  "The provided address ID does not belong to the requester.";
const ADDRESS_SUCCESSFULLY_REMOVED =
  "The address has been successfully removed";
const ADDRESS_NOT_FOUND = "Address not found.";
const ERROR_UPDATING_ADDRESS =
  "An error occurred when trying to update the address.";
const ERROR_GETTING_CART = "An error occurred when trying to get the cart";

module.exports = {
  MSG_READ,
  MSG_UNREAD,
  ORDER_PROCESSED,
  ORDER_PENDING_PAYMENT,
  ORDER_FINISHED,
  BUSINESS_NAME,
  IS_NORMAL_USER,
  IS_OWNER,
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_METHOD_MERCADOPAGO,
  REQUEST_WITHOUT_TOKEN,
  ERROR_ADDING_AUDIT_REGISTER,
  CHAT_ID_NOT_FOUND,
  ERROR_RETRIEVING_MSGS,
  ERROR_GET_UNREAD_MSGS,
  NOT_FOUND_VERIFY_PROD,
  CHAT_MSG_NOT_FOUND,
  ERROR_ADDING_CHAT_MSG,
  ERROR_UPDATE_CHAT,
  NOT_ITEMS_RECEIVED,
  APPROVED_STATUS,
  INSUFFICIENT_PRIVILEGES,
  ORDER_SUCCESSFULLY_REMOVED,
  ORDER_ID_NOT_FOUND,
  ERROR_SAVING_ORDER,
  MERCADOPAGO_CREDIT_CARD,
  ERROR_UPDATING_ORDER,
  GENERIC_ERROR_MSG,
  GENERIC_ERROR_DETAILED,
  ORDER_WITHOUT_PENDING_BALANCE,
  ERROR_ADDING_STATUS_HISTORY,
  ERROR_ADDING_MSG_ORDER,
  ERROR_UPDATE_ORDER,
  ERROR_RETRIEVING_MSGS_ORDER,
  DB_CONNECTION_SUCCESSFULLY,
  ERROR_CONNECTING_DB,
  SERVER_LISTENING_ON_PORT,
  API_ROUTER_PATH,
  ERROR_SAVING_ADDRESS,
  ERROR_FINDING_ADDRESS,
  ERROR_DELETING_ADDRESS,
  UNAUTHORIZED_USER_ADDRESS_OPERATION,
  ADDRESS_SUCCESSFULLY_REMOVED,
  ADDRESS_NOT_FOUND,
  ERROR_UPDATING_ADDRESS,
  ERROR_GETTING_CART,
};
