import svg2ttf from 'svg2ttf';
import { nodeToSvg } from './utils';

// ReadStream & { metadata: { unicode: string[], name: string }

const generate = async (nodes: readonly SceneNode[]) => {
  nodes.forEach(async (node) => {
    const svgText: string | null = await nodeToSvg(node);
  });
};

export default generate;
