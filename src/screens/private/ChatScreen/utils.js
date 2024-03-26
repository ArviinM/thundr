import moment from 'moment/moment';

export const formatMessages = chatMessages => {
  return chatMessages.map(message => {
    // console.log();
    return {
      _id: message.id,
      text: message.message,
      createdAt: message.created,
      user: {
        _id: message.senderSub,
      },
      image: message.attachments,
      chatRoomID: message.chatRoomID,
    };
  });
};

export const formatDateAndTime = createdAt => {
  const dateObject = new Date(createdAt);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`;
};
export const organizeChatMessages = chatMessages => {
  const groupedMessagesByDay = {};

  chatMessages.forEach(message => {
    const createdDate = new Date(message.created);
    const currentDate = new Date();

    if (createdDate.toDateString() === currentDate.toDateString()) {
      // Message is from today
      const day = 'Today';
      if (!groupedMessagesByDay[day]) {
        groupedMessagesByDay[day] = [];
      }
      groupedMessagesByDay[day].push(message);
    } else if (
      createdDate.toDateString() ===
      new Date(currentDate.getTime() - 86400000).toDateString()
    ) {
      // Message is from yesterday
      const day = 'Yesterday';
      if (!groupedMessagesByDay[day]) {
        groupedMessagesByDay[day] = [];
      }
      groupedMessagesByDay[day].push(message);
    } else {
      // Message is from another day
      const formattedDay = moment(createdDate).format('MMMM DD, dddd');
      if (!groupedMessagesByDay[formattedDay]) {
        groupedMessagesByDay[formattedDay] = [];
      }
      groupedMessagesByDay[formattedDay].push(message);
    }
  });

  return groupedMessagesByDay;
};

export const MAX_IMAGE_SIZE_BYTES = 8 * 1024 * 1024;
