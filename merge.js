
const mergePdfs = async (p1, p2, p3, p4) => {
  try {
     // Validate parameters before processing
     if (!p1 || !p2) {
      throw new Error('Missing input PDF files.');
  }

      const PDFMerger = await import('pdf-merger-js');
      const merger = new PDFMerger.default();

      await merger.add(p1);
      await merger.add(p2);

      if (p3) await merger.add(p3);
      if (p4) await merger.add(p4);

      const d = new Date().getTime();
      await merger.save(`static/${d}.pdf`);

      return d;
  } catch (err) {
      console.error('Error merging PDFs:', err.message);
      throw new Error('Failed to merge PDF files.');
  }
};

module.exports = { mergePdfs };


module.exports= {mergePdfs};
