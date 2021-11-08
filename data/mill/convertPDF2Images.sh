for i in *.pdf; do magick convert $i -resize 1920 $i.png; done
for i in *.pdf; do magick convert $i $i.tif; done
for i in *.pdf; do magick convert $i $i.jpg; done
pdfunite *.pdf all.pdf

