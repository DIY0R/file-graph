shopt -s nullglob

find ./dist/esm -name "*.js" | while read -r file; do
  echo "Updating $file contents..."
  sed -i "s/\.js'/\.mjs'/g" "$file"
  echo "Renaming $file to ${file%.js}.mjs..."
  mv "$file" "${file%.js}.mjs"
done
