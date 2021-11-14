
for i in *.pdf; do magick convert $i -resize 1920 $i.png; done
for file in *pdf.png; do mv "$file" "${file/.pdf.png/.png}"; done
for i in *.pdf; do magick convert $i $i.tif; done
for file in *pdf.tif; do mv "$file" "${file/.pdf.tif/.tif}"; done
cd ..
node createCoreImages ./algorithm-1636347815_printrun-1636419296933_size-AR16x9_book
node createFilm ./algorithm-1636347815_printrun-1636419296933_size-AR16x9_book
cd ./algorithm-1636347815_printrun-1636419296933_size-AR16x9_book
ffmpeg -r 24 -f image2  -s 1920x1080 -start_number 01 -i algorithm-1636347815_printrun-1636419296933_size-AR16x9_%02d.png algorithm-1636347815_printrun-1636419296933_size-AR16x9.webm
ffmpeg -r 24 -f image2  -s 1920x1080 -start_number 000001 -i image-%06d.png algorithm-1636347815_printrun-1636419296933_size-AR16x9_pulse.webm
rm coreimage*.png
for i in algorithm*.png; do magick convert $i -resize 640 $i.small.png; done;
for file in *png.small.png; do mv "$file" "${file/.png.small.png/-small.png}"; done;
pdfunite *.pdf algorithm-1636347815_printrun-1636419296933_size-AR16x9.pdf
# quicktime: open an image sequence with image-* files and save as algorithm-1636347815_printrun-1636419296933_size-AR16x9_pulse.mov
# rm image-*.png
# quicktime: open an image sequence with algorithm-1636347815_printrun-1636419296933_size-AR16x9 files order by date created and save as algorithm-1636347815_printrun-1636419296933_size-AR16x9.mov
	