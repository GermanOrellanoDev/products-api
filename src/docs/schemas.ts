/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *           example: "64f1c9e2a1b23"
 *         name:
 *           type: string
 *           example: "Teclado mecánico"
 *         description:
 *           type: string
 *           example: "Teclado mecánico RGB"
 *         price:
 *           type: number
 *           example: 150.5
 *         stock:
 *           type: integer
 *           example: 25
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           example: "Mouse gamer"
 *         description:
 *           type: string
 *           example: "Mouse 16000 DPI"
 *         price:
 *           type: number
 *           example: 80
 *         stock:
 *           type: integer
 *           example: 10
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StockMovement:
 *       type: object
 *       required:
 *         - id
 *         - productId
 *         - type
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           example: "mov_123456"
 *         productId:
 *           type: string
 *           example: "64f1c9e2a1b23"
 *         type:
 *           type: string
 *           enum: [IN, OUT]
 *           example: "IN"
 *         quantity:
 *           type: integer
 *           example: 5
 *         reason:
 *           type: string
 *           example: "Compra proveedor"
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: "Producto no encontrado"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Operación realizada correctamente"
 */
