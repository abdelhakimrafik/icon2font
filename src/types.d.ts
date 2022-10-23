export type OptionsType = {
  fileName: string;
  fontName?: string;
  prefix?: string;
  suffix?: string;
  exportOptions?: string[];
};

export type UIRequestEventType = {
  type: request;
  data: any;
};

export type GlyphType = {
  content: string;
  metadata: {
    name: string;
    unicode: string[];
  };
};

export type GlyphsExportOptionsType = {
  prefix?: string;
  suffix?: string;
};

export type FontConfigType = {
  name: string;
  icons: Record<string, string[]>;
};
