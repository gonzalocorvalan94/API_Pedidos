import fs from "fs/promises"; //para poder usar async/await
import { Pedido } from "./pedidos.models";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "../db/pedidos.json"); //Ruta absoluta al JSON

export async function getAllPedidos() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const pedidos = JSON.parse(data);
    return pedidos.map((p) => Pedido(p));
  } catch (error) {
    console.error("Error al leer pedidos: ", error);
    return [];
  }
}
/*
para probarlo:
import { getAllPedidos } from "./pedidosManager.js";
const pedidos = await getAllPedidos();
console.log(pedidos);
*/
//guardar pedido podria ir en otro lado(gonza)
export async function guardarPedidos(pedidos) {
  await fs.writeFile(DB_PATH, JSON.stringify(pedidos, null, 2));
}
export async function getPedidoByID(id) {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const pedidos = JSON.parse(data);
    const busca = pedidos.find((p) => p.id === Number(id));
    if (!busca) return null; //el controller se encarag de devolver el mensaje

    return Pedido({ ...busca });
  } catch (error) {
    console.error("Error al buscar su id: ", error);
    throw error; // para que el controller lo maneje
  }
}
export async function addPedido(pedidoData) {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const pedidos = JSON.parse(data);

    const id = pedidos.length ? pedidos[pedidos.length - 1].id + 1 : 1;
    const nuevoPedido = Pedido({ id, ...pedidoData });
    pedidos.push(nuevoPedido);
    await guardarPedidos(pedidos);

    return nuevoPedido;
  } catch (error) {
    console.error("Error al agregar su pedido: ", error);
    throw error;
  }
}
export async function updatePedido(id, newData) {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const pedidos = JSON.parse(data);
    const index = pedidos.findIndex((n) => n.id === Number(id));
    if (index === -1) return null;
    pedidos[index] = Pedido({ ...pedidos[index], ...newData });
    await guardarPedidos(pedidos);
    return pedidos[index];
  } catch (error) {
    console.error("Error al actualizar su pedido: ", error);
    throw error;
  }
}
export async function deletePedido(id) {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    const pedidos = JSON.parse(data);
    const index = pedidos.findIndex((n) => n.id === Number(id));
    if (index === -1) return null;
    const [eliminado] = pedidos.splice(index, 1);

    await guardarPedidos(pedidos);
    return eliminado;
  } catch (error) {
    console.error("Error al eliminar su pedido: ", error);
    throw error;
  }
}
