import { Readable } from 'stream';
import { request } from '@src/core/constants';

export type OptionsType = {
  fontName?: string;
  prefix?: string;
  suffix?: string;
  delimiter?: string;
  exportOptions?: string[];
};

export type UIRequestEventType = {
  type: request;
  data: any;
};

export type GlyphMetadata = {
  name: string;
  unicode: string[];
};

export type GlyphType = {
  content: string;
  metadata: GlyphMetadata;
};

export type GlyphsExportOptionsType = Omit<
  OptionsType,
  'fontName' | 'exportOptions'
>;

export type FontConfigType = {
  name: string;
  icons: Record<string, string | number>;
};

export interface glyphsToSvgFontOptions {
  fontName: string;
  fontHeight?: number;
  normalize?: boolean;
}

export type GlyphStreamType = Readable & { metadata?: Partial<GlyphMetadata> };
