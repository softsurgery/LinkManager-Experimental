export function getRandomColor() {
    // Generate random R, G, and B values
    const r = Math.floor(Math.random() * 256); // Random number between 0 and 255
    const g = Math.floor(Math.random() * 256); // Random number between 0 and 255
    const b = Math.floor(Math.random() * 256); // Random number between 0 and 255
  
    // Convert RGB values to hexadecimal format
    const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  
    return color;
  }