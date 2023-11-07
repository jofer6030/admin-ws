export const getFormatDate = {
  dateAndHours: (data) => {
    const format = new Date(data + 'Z').toLocaleString().split(',');
    const date = format[0].trim();
    const hours = format[1].trim();
    return [date, hours];
  },
  formatTimestampToTime: (timestamp) => {
    let date;
    // Crea un objeto Date a partir del timestamp (multiplicado por 1000 para convertirlo a milisegundos)
    if (timestamp.length > 10) {
      date = new Date(+timestamp);
    } else {
      date = new Date(+timestamp * 1000);
    }

    // Obtiene las horas, minutos y segundos
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Determina si es a.m. o p.m.
    const amOrPm = hours >= 12 ? 'p.m.' : 'a.m.';

    // Ajusta las horas para que estén en el rango de 1 a 12
    const formattedHours = hours % 12 || 12;

    // Agrega un cero inicial si los minutos son menores a 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Formatea la hora en el formato deseado
    const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;

    return formattedTime;
  },
};
