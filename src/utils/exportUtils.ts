/* src/utils/exportUtils.ts
   ✅ True PDF download (no print dialog)
   ✅ CSV + Print remain unchanged
*/

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/** ---------------- CSV Export ---------------- */
export function exportToCSV(participants: any[], programInfo: any) {
  const headers = [
    "ওয়ার্ড",
    "নাম",
    "মান",
    "উপশাখা",
    "উপস্থিতি",
    "আসার সময়",
    "যাওয়ার সময়",
    "ছুটি",
  ];
  const csvRows = [
    headers.join(","),
    ...participants.map((p) =>
      [
        p.ward,
        p.name,
        p.man,
        p.uposhakha,
        p.status,
        p.arrivalTime,
        p.departureTime,
        p.chuti,
      ]
        .map((v) => `"${v || ""}"`)
        .join(",")
    ),
  ];

  const blob = new Blob(["\ufeff" + csvRows.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `attendance_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
}

/** ---------------- Print Preview ---------------- */
export function printPDF(participants: any[], programInfo: any, notes: any) {
  const html = buildHTML(participants, programInfo, notes);
  const printWin = window.open("", "_blank");
  if (!printWin) return;
  printWin.document.write(html);
  printWin.document.close();
  printWin.focus();
  printWin.print();
}

/** ---------------- Real PDF Download ---------------- */
export async function downloadPDF(
  participants: any[],
  programInfo: any,
  notes: any
) {
  // Generate the same HTML as print view
  const html = buildHTML(participants, programInfo, notes);

  // Create a temporary hidden element
  const container = document.createElement("div");
  container.innerHTML = html;
  container.style.position = "fixed";
  container.style.left = "-9999px";
  document.body.appendChild(container);

  // Convert HTML to image
  const canvas = await html2canvas(container, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");

  // Build PDF
  const pdf = new jsPDF("p", "mm", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, width, height);

  // Save file
  pdf.save(`attendance_${new Date().toISOString().split("T")[0]}.pdf`);

  // Cleanup
  document.body.removeChild(container);
}

/** ---------------- HTML Generator ---------------- */
function buildHTML(participants: any[], programInfo: any, notes: any) {
  return `
  <html lang="bn">
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: "Noto Sans Bengali", sans-serif; margin: 40px; color: #333; }
      h1, h2 { text-align: center; color: #4A148C; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { border: 1px solid #aaa; padding: 8px; text-align: left; font-size: 14px; }
      th { background-color: #f3e5f5; }
      .notes { margin-top: 40px; border-top: 2px dashed #aaa; padding-top: 10px; }
    </style>
  </head>
  <body>
    <h1>উপস্থিতি রিপোর্ট</h1>
    <h2>${programInfo?.type || ""} - ${programInfo?.location || ""}</h2>
    <p><strong>তারিখ:</strong> ${programInfo?.date || ""}</p>
    <p><strong>সময়:</strong> ${programInfo?.startTime || ""} - ${
    programInfo?.endTime || ""
  }</p>

    <table>
      <thead>
        <tr>
          <th>নাম</th>
          <th>ওয়ার্ড</th>
          <th>মান</th>
          <th>উপশাখা</th>
          <th>উপস্থিতি</th>
          <th>আগমনের সময়</th>
          <th>প্রস্থানের সময়</th>
          <th>ছুটি</th>
        </tr>
      </thead>
      <tbody>
        ${participants
          .map(
            (p) => `
          <tr>
            <td>${p.name}</td>
            <td>${p.ward}</td>
            <td>${p.man}</td>
            <td>${p.uposhakha || ""}</td>
            <td>${p.status || ""}</td>
            <td>${p.arrivalTime || ""}</td>
            <td>${p.departureTime || ""}</td>
            <td>${p.chuti || ""}</td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>

    ${
      notes?.pages?.some((p: any) => p.text?.trim())
        ? `<div class="notes">
             <h2>নোট</h2>
             ${notes.pages
               .filter((p: any) => p.text?.trim())
               .map(
                 (p: any, i: number) =>
                   `<p><strong>পৃষ্ঠা ${i + 1}:</strong> ${p.text
                     .replace(/\n/g, "<br>")
                     .trim()}</p>`
               )
               .join("")}
           </div>`
        : ""
    }
  </body>
  </html>`;
}
