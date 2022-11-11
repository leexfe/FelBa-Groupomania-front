const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/`


export { url }