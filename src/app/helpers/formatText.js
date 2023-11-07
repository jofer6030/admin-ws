export const formatText = {
  fromWhatsApp: (text) => {
    // Aplicar formato para texto en negrita (*texto*)
    text = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');

    // Aplicar formato para código (`código`)
    text = text.replace(/`(.*?)`/g, '<code>$1</code>');

    return text;
  },
};
