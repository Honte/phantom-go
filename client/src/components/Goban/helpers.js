export function verticalLine(id, y1, y2, x) {
  return {
    id,
    attributes: {
      x1: x,
      x2: x,
      y1,
      y2
    }
  };
}

export function horizontalLine(id, x1, x2, y) {
  return {
    id,
    attributes: {
      x1,
      x2,
      y1: y,
      y2: y
    }
  };
}

export function text(id, label, x, y) {
  return {
    id,
    label,
    attributes: {
      x,
      y
    }
  };
}
