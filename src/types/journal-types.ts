export interface EncryptedText {
  cipher: string;
  decrypt: (encryptedText: EncryptedText) => PlainText;
}

export interface PlainText {
  text: string;
  encrypt: (plainText: PlainText) => EncryptedText;
}

export interface SectionMetadata {
  name: string;
  rating?: EncryptedText;
  title?: EncryptedText;
}

export interface DateMetadata {
  date: string;
  sections: Array<SectionMetadata>;
}

export interface JournalMonths {
  month: string;
  dates: Array<DateMetadata>;
}

export interface JournalEntry {
  date: string;
  entries: Array<string>;
}
