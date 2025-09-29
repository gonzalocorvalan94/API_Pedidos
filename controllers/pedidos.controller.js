//una const getpedidos = async function devuelve el json y retorna con status(200), el  json 
//routes
import { Router } from "express";
import {
  getAllPedidos,
  getPedidoByID,
  addPedido,
  updatePedido,
  deletePedido,
} from "../models/pedidosManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pedidos = await getAllPedidos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obetener los pedidos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pedidos = await getPedidoByID(req.params.id);
    if (!pedidos)
      return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el pedido" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPedido ={
      nombre: req.body,
      direccion,
      telefono,
      precio,
      envio,
      propina,
      preciototal,
      forma_de_pago,
    };
    if (
      !nombre ||
      !direccion ||
      !telefono ||
      !precio ||
      !envio ||
      !propina ||
      !preciototal ||
      !forma_de_pago
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const nuevoPedido = await addPedido({nombre, direccion, telefono, envio, propina,preciototal, forma_de_pago});
    res.status(201).json(nuevoPedido);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el pedido" });
  }
});

router.patch("/:id", async (req, res) => {
  //actualiza parcialmente
  try {
    const pedidoActualizado = await updatePedido(req.params.id, req.body);
    if (!pedidoActualizado)
      return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(pedidoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
});

router.put("/:id", async (req, res) => {
  //actualiza todo el pedido
  try {
    const pedidoActualizado = await updatePedido(req.params.id, req.body);
    if (!pedidoActualizado)
      return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(pedidoActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await deletePedido(req.params.id);
    if (!eliminado)
      return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ mensaje: "pedido eliminado correctamente", pedido: eliminado });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el pedido" });
  }
});

export default router;
