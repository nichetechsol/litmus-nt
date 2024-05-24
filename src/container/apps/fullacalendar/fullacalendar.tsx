import  { FC, Fragment, useEffect, useState } from 'react';
import Pageheader from '../../../components/common/pageheader/pageheader';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import media86 from "../../../assets/images/media/media-83.svg";
import SimpleBar from 'simplebar-react';
interface FullacalendarProps {}

const Fullacalendar: FC<FullacalendarProps> = () => {
  let eventGuid = 0;
  const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
  const INITIAL_EVENTS = [
    {
      id: createEventId(),
      title: "Meeting",
      start: todayStr,
    },
    {
      id: createEventId(),
      title: "Meeting Time",
      start: todayStr + "T16:00:00",
    },
  ];

  function createEventId() {
    return String(eventGuid++);
  }
  const initialstate1 = {
    calendarEvents: [
      {
        title: "Atlanta Monster",
        start: new Date("2019-04-04 00:00"),
        id: "1001",
      },
      {
        title: "My Favorite Murder",
        start: new Date("2019-04-05 00:00"),
        id: "1002",
      },
    ],

    events: [
      {
        title: "Calendar Events",
        id: "1",
        bg: "primary",
      },
      {
        title: "Birthday Events",
        id: "2",
        bg: "secondary",
      },
      {
        title: "Holiday Calendar",
        id: "3",
        bg: "success",
      },
      {
        title: "Office Events",
        id: "4", 
        bg: "info",
      },
      {
        title: "Other Events",
        id: "5",
        bg: "warning",
      },
      {
        title: "Festival Events",
        id: "6",
        bg: "danger",
      },
      {
        title: "Timeline Events",
        id: "7",
        bg: "teal",
      },
    ],
  };
  const [state] = useState(initialstate1);

  useEffect(() => {
    const draggableEl: any = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl: any) {
        const title = eventEl.getAttribute("title");
        const id = eventEl.getAttribute("data");
        const classValue = eventEl.getAttribute("class");
        return {
          title: title,
          id: id,
          className: classValue,
        };
      },
    });
  }, []);

  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }
  const handleEventClick = (clickInfo: any) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };
  const handleEvents = () => { };

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };
  return(
  <Fragment>
     <Pageheader currentpage="Full Calendar" activepage="Apps" mainpage="Full Calendar" />
      <div className="grid grid-cols-12 gap-6">
        <div className="xl:col-span-3 col-span-12">
          <div className="box custom-box">
            <div className="py-4 px-[1.25rem] border-b dark:border-defaultborder/10  !grid">
              <button type="button" className="ti-btn ti-btn-primary"><i className="ri-add-line align-middle me-1 font-semibold inline-block"></i>Create New Event</button>
            </div>
            <div className="box-body !p-0">
              <div id="external-events" className="border-b dark:border-defaultborder/10 p-4">
              {state.events.map((event: any) => (
                <div
                  className={`fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event !bg-${event.bg} border !border-${event.bg}`} key={event.id} title={event.title}>
                  <div className="fc-event-main">{event.title}</div>
                </div>
              ))}
              </div>
              <div className="p-4 border-b dark:border-defaultborder/10 ">
                <div className="flex items-center mb-4 justify-between">
                  <h6 className="font-semibold">
                    Activity :
                  </h6>
                  <button type="button" className="ti-btn !py-1 !px-2 !text-[0.75rem] ti-btn-primary btn-wave">View All</button>
                </div>
                <SimpleBar style={{ height: "330px"}}>
                <ul className="list-none mb-0 fullcalendar-events-activity" id="full-calendar-activity">
                  <li>
                    <div className="flex items-center justify-between flex-wrap">
                      <p className="mb-1 font-semibold">
                        Monday, Jan 1,2023
                      </p>
                      <span className="badge bg-light text-default mb-1">12:00PM - 1:00PM</span>
                    </div>
                    <p className="mb-0 text-mutedtext-[0.75rem]">
                      Meeting with a client about new project requirement.
                    </p>
                  </li>
                  <li>
                    <div className="flex items-center justify-between flex-wrap">
                      <p className="mb-1 font-semibold">
                        Thursday, Dec 29,2022
                      </p>
                      <span className="badge bg-success text-white mb-1">Completed</span>
                    </div>
                    <p className="mb-0 text-muted text-[0.75rem]">
                      Birthday party of niha suka
                    </p>
                  </li>
                  <li>
                    <div className="flex items-center justify-between flex-wrap">
                      <p className="mb-1 font-semibold">
                        Wednesday, Jan 3,2023
                      </p>
                      <span className="badge bg-warning/10 text-warning mb-1">Reminder</span>
                    </div>
                    <p className="mb-0 text-mutedtext-[0.75rem]">
                      WOrk taget for new project is completing
                    </p>
                  </li>
                  <li>
                    <div className="flex items-center justify-between flex-wrap">
                      <p className="mb-1 font-semibold">
                        Friday, Jan 20,2023
                      </p>
                      <span className="badge bg-light text-default mb-1">06:00PM - 09:00PM</span>
                    </div>
                    <p className="mb-0 text-mutedtext-[0.75rem]">
                      Watch new movie with family
                    </p>
                  </li>
                  <li>
                    <div className="flex items-center justify-between flex-wrap">
                      <p className="mb-1 font-semibold">
                        Saturday, Jan 07,2023
                      </p>
                      <span className="badge bg-danger/10 text-danger mb-1">Due Date</span>
                    </div>
                    <p className="mb-0 text-muted text-[0.75rem]">
                      Last day to pay the electricity bill and water bill.need to check the bank details.
                    </p>
                  </li>
                </ul>
                </SimpleBar>
              </div>
              <div className="p-4">
                <img src={media86} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-9 col-span-12">
          <div className="box custom-box">
            <div className="box-header">
              <div className="box-title">Full Calendar</div>
            </div>
            <div className="box-body">
              <div id="calendar2">
              <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin,]}
                  headerToolbar={{ left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay", }}
                  initialView="dayGridMonth" editable={true} selectable={true} selectMirror={true} dayMaxEvents={true}
                  initialEvents={INITIAL_EVENTS} select={handleDateSelect} eventContent={renderEventContent} eventClick={handleEventClick}
                  eventsSet={handleEvents}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  </Fragment>
);}

export default Fullacalendar;
