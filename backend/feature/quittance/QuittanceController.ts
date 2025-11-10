import { Request, Response } from "express";
import ejs from "ejs";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

export async function printQuittance(req: Request, res: Response) {
  const {tenantId,agenceId, name_client, amount, paymentDate, adresse, period } = req.body;
  console.log(name_client);

  const html = await ejs.renderFile(
    path.join(__dirname, "../views", "Quittance.ejs"),
    { name_client, amount, paymentDate, adresse, period }
  );

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  // Générer le PDF en mémoire
  const buffer = await page.pdf({ format: "A4", printBackground: true });

  // Sauvegarde dans le dossier
  const filename = `quittance-${name_client}-${period}.pdf`;
  const filePath = path.join(__dirname, "../quittances", filename);
  fs.writeFileSync(filePath, buffer);

  await browser.close();
  // Envoyer le PDF en réponse
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
  res.send(buffer);
}

export function downloadQuittance(){

}