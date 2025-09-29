router.get("/", /* aca va a funcion del controlador*/ async (req, res) => {
  try {
    const pedidos = await getAllPedidos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obetener los pedidos" });
  }
});
