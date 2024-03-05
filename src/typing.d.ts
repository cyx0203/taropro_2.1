interface Window {
  GG: {
    Config: {
      initFlw: string;
      hideHomeBtn: boolean;
      extendButton: any;
    };
    Res: (url: string) => string;
    Mod: (fileName: string, type: string) => void;
  };
}
