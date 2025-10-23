import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve arquivos estáticos gerados pelo Vite
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "../dist/public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Rota de verificação para o painel
  app.get("/health", (_req, res) => {
    res.status(200).send("OK");
  });

  // Roteamento SPA: serve index.html para todas as rotas
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
