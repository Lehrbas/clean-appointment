/* 
  Defines the AppointmentStatus enum for the Appointment enitity

  Im doing a simple implementation here, so we can query by the status of the appointment and update it manually.
  But in a real world scenario, we would have background jobs that would update the status of the appointment based on the time
  using something like a message queue (probably RabbitMQ) to handle events.
  When an appointment is created, you could publish a message with the start time and appointmentId
  to a message queue. Then have a worker process that subscribes to the message queue and 
  checks for any appointments that are due to start. When an appointment is due to start, the worker can update 
  the appointment status to "in progress".

  This is just one way of doing it, there are many other ways to handle this.
  Like a task scheduler, or a state machine, or a cron job, or a combination of all of them.
*/

// AWAITING: The appointment is awaiting its time to start
// INPROGRESS: The appointment is in progress
// CANCELLED: The appointment has been cancelled by the customer or professional
// COMPLETED: The appointment has been completed

export enum AppointmentStatus {
  AWAITING = 'AW',
  INPROGRESS = 'IP',
  CANCELLED = 'CA',
  COMPLETED = 'CO',
}
