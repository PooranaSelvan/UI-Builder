export const generateHTML = (blocks) => {
  const htmlBlocks = blocks.map(block => {
    switch (block.type) {
      case 'header':
        return `<header style="text-align: center; padding: 40px 0; background: #4a90e2; color: white;"><h1>${block.content.text}</h1></header>`;
      case 'hero':
        return `<section style="text-align: center; padding: 60px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;"><h1>${block.content.title}</h1><p>${block.content.subtitle}</p>${block.content.buttonText ? `<button style="margin-top: 16px; padding: 10px 18px; border-radius: 8px; border: 0; background: rgba(255,255,255,.18); color: white; font-weight: 600;">${block.content.buttonText}</button>` : ""}</section>`;
      case 'card':
        return `<div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fff; margin: 20px 0;"><h3>${block.content.title}</h3><p>${block.content.description}</p></div>`;
      case 'cards': {
        const cards = (block.content.cards || [])
          .map(
            (c) =>
              `<div style="padding: 18px; border: 1px solid #ddd; border-radius: 12px; background: #fff;"><h3 style="margin: 0 0 8px;">${c.title || ""}</h3><p style="margin: 0; color: #444;">${c.description || ""}</p></div>`
          )
          .join("");
        return `<section style="padding: 28px 0; margin: 20px 0;"><div style="max-width: 1000px; margin: 0 auto; padding: 0 16px;"><h2 style="margin: 0 0 14px;">${block.content.title || ""}</h2><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">${cards}</div></div></section>`;
      }
      case 'form':
        return `<form style="padding: 20px; background: #f0f0f0; border-radius: 12px; margin: 20px 0;"><h2 style="margin: 0 0 12px;">${block.content.title || ""}</h2>${(block.content.fields || [])
          .map(
            (f) =>
              `<div style="margin: 10px 0;"><label style="display:block; font-size: 14px; margin-bottom: 6px;">${f.label || ""}</label><input type="text" placeholder="${f.placeholder || ""}" style="display: block; width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 8px;"></div>`
          )
          .join("")}<button type="submit" style="padding: 10px 20px; background: #4a90e2; color: white; border: none; border-radius: 8px;">${block.content.button || "Submit"}</button></form>`;
      case 'footer':
        return `<footer style="text-align: center; padding: 20px; background: #333; color: white;"><p>${block.content.text}</p></footer>`;
      default:
        return '';
    }
  }).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
</head>
<body>
  ${htmlBlocks}
</body>
</html>
  `;
};