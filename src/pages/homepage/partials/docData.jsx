// ============== CLIENTS ==============

// Content 1

const clientI = {
  title: "How to add a new client in the AGENDA database?",
  list: [
    "Go to the Clients tab",
    "Fill the inputs fields with the name, the phone and the client email",
    "Press the ADD CLIENT button",
    "Check if the info are correnct and submit the client data in the confirmation modal",
  ],
};
// Content 2

const clientII = {
  title:
    "How to edit the client data saved, maybe to update some field or delete the client information?",
  list: [
    "Go to the Clients tab",
    "Search in the clients table the target client",
    "At the end of the table you will find an EDIT column, that allow you to edit the client data",
    "If you want to DELETE it, just select the bin icon and confirm next the choice in the modal",
    "If there is a need to change one or more field, just click the edit icon",
    "In the modal, edit the field that must be updated and confirm the new input",
  ],
};
// Content 3

const clientIII = {
  title: "The clients table view",
  list: [
    "Go to the Clients tab",
    "Under the create new client form, if the database contain at least one client, the client data will be displayed inside a table",
    "At the top of the table there is a SEARCH field, where you can look for clients fastly",
    "The table body contain all the client information and also the column that let EDIT the client data",
    "Filally, under the table, every 10 records will be generate a number for the table pagination",
  ],
};

// ============== SUBSCRIPTIONS ==============

const subI = {
  title: "How to create a new subscription?",
  list: [
    "Go to the Subscriptions tab",
    "To create a new subscription the database must to include at least one client",
    "Search the client that will recieve a subscription in the client select field",
    "Select how many trainings this subscription will include",
    "Select the start day of the subscription",
    "Input the price",
    "If all or some of the trainings days are already programmed in the moment that the subscription creation, than you can press the button Training days to book the trainings",
    "A modal with a calendar will be open",
    "First of all you must to select the training time from the top-right select",
    "Now select all the trainings day with the same training time, selected before",
    "If you need to select another training time, just change the time from the select and than select the training days for the new time",
    "Finally, with trainings day scheduled or even without, press the Ass Subscription button",
    "Check if the subscription data are corrects and than submit the new subscription",
  ],
};
// Content 2

const subII = {
  title: "How to delete a subscription?",
  list: [
    "Go to the Subscriptions tab",
    "Search in the subscriptions table the target subscription using the client name",
    "At the end of the table you will find an EDIT column, that allow you to edit or delete the subscription",
    "To delete the subscription press on the bin icon",
    "Confirm the delete action in the modal pressing the submit button",
  ],
};
// Content 3

const subIII = {
  title: "How to reactivate a subscription till the expiration date?",
  list: [
    "Go to the Subscriptions tab",
    "This action allow to refresh the last subscription that a client had, before the expire date, with the same data of the last subscription",
    "In the table below the subscription form, there is a refresh icon",
    "Press the refresh icon",
    "A modal with all the last subscription data will apear",
    "Just set the new start date for the new subscription and confirm the input pressing the submit button",
  ],
};
// Content 4

const subIV = {
  title: "The Subscriptions table view",
  list: [
    "Go to the Subscriptions tab",
    "Under the create new subscription form, if the database contain at least one subscription, the subscription data will be displayed inside a table",
    "At the top of the table there is a SEARCH field, where you can look for subscriptions fastly",
    "Each subscription displayed in the table contains the name, the total trainigs day of the subscription, how many trainings was done, how many trainings remain to be done, how many trainings are scheduled, how many time a booked session was rescheduled, the start date, the end date, the status of the subscription and the edit buttons",
    "Filally, under the table, every 10 records will be generate a number for the table pagination",
  ],
};

// ============== BOOKINGS ==============

const bookI = {
  title: "How to check the AGENDA booking days?",
  list: [
    "Go to the Calendar tab",
    "Every day in the calendar contain under the date a small number, that is the total bookings schedulet for the selected day",
    "When a day is selected in the calendar, then the booking table on the right side of the page, will be update according the scheduled bookings for the selected day",
    "Each booking day contain the name of the client, the training session time, the status and also edit buttons",
    "The status is red if the training sessions was done according the training time or green if is not jet done",
  ],
};
// Content 2

const bookII = {
  title: "How to create a new booking for a training session?",
  list: [
    "Go to the Calendar tab",
    "Under the calendar, if there is at least one active subscription, the button schedule bookings is displayed",
    "Press the Schedule Bookings button",
    "A modal to create the new booking will appear on the screen",
    "Select a client that will be used in the booking",
    "Select a time range for the training session",
    "In the calendar select the date of the training session",
    "If all the field are correct selected, submit the new booking",
  ],
};
// Content 3

const bookIII = {
  title: "How to re-schedule a training day booking?",
  list: [
    "Go to the Calendar tab",
    "Select the day of the booking that will be updated in the calendar",
    "Search the booking session in the booking table on the right",
    "Press the edit icon",
    "A modal with all the booking data will apear",
    "Select a new traing time range and a new date in the calendar",
    "Press on Reschedule to submit the change",
    "In the subscription table, the same client will have now a re-scheduled training more to keep in mind how often people re-schedule a training session",
  ],
};
// Content 4

const bookIV = {
  title: "The Calendar table view",
  list: [
    "Go to the Calendar tab",
    "Select the day of the booking that will be deleted in the calendar",
    "Search the booking session in the booking table on the right",
    "Press the delete icon",
    "A modal with all the booking data will apear",
    "Confirm the delete action with the submit button in the modal",
  ],
};

// ============== INCOME ==============

const incI = {
  title: "How the Income table contains?",
  list: [
    "On the bottom navigation, press the money icon",
    "The Income page will appear",
    "If there is at least one subscription in the database, the table will be displayed",
    "Every year will be listed on the top of the page, like buttons",
    "The table contain, for every moth that is at least one subscription, the month name, the list of the clients and the subscription price",
    "At the end of every month the total ammount of income will be displayed",
  ],
};

export const docData = [
  // CLIENTS
  {
    title: "I. The Clients",
    subtitle: [
      "Add a new client in the agenda",
      "Edit or Delete the client informations",
      "The clients table",
    ],
    content: [clientI, clientII, clientIII],
  },
  // SUBSCRIPTIONS
  {
    title: "II. The Subscriptions",
    subtitle: [
      "Create a new subscriptions for an existing client",
      "Delete the subscrption",
      "Re-activate the subscription",
      "The Subsctiptions table",
    ],
    content: [subI, subII, subIII, subIV],
  },
  // BOOKINGS
  {
    title: "III. The Bookings",
    subtitle: [
      "Check bookings",
      "Create a new booking",
      "Reschedule a training session booking",
      "Delete a booking",
    ],
    content: [bookI, bookII, bookIII, bookIV],
  },
  // INCOME
  {
    title: "IV. The Incomes",
    subtitle: ["Check incomes"],
    content: [incI],
  },
];
