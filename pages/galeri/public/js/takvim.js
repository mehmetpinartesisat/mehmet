
  const calendar = document.getElementById("calendar");
  const calendarHeader = document.getElementById("calendar-header");
  const dayNames = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  const resmiTatiller = ["1/1", "23/4", "1/5", "19/5", "30/8", "29/10"];

  function renderCalendar() {
    calendar.innerHTML = "";

    // Başlık
    calendarHeader.innerText = `${monthNames[currentMonth]} ${currentYear}`;
    calendarHeader.style.fontSize = "1.5rem";
    calendarHeader.style.fontWeight = "bold";
    calendarHeader.style.marginBottom = "10px";
    calendarHeader.style.textAlign = "center";

    // Gün isimleri
    dayNames.forEach(name => {
      const div = document.createElement("div");
      div.className = "day-name";
      div.innerText = name;
      calendar.appendChild(div);
    });

    const firstDay = new Date(currentYear, currentMonth, 1);
    const firstWeekday = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Boş kutular
    for (let i = 0; i < firstWeekday; i++) {
      const empty = document.createElement("div");
      calendar.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const div = document.createElement("div");
      div.classList.add("day");

      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      const isSunday = date.getDay() === 0;
      const dateKey = `${day}/${currentMonth + 1}`;
      const isHoliday = resmiTatiller.includes(dateKey);

      if (isToday) div.classList.add("today");
      if (isSunday) div.classList.add("weekend");
      if (isHoliday) div.classList.add("holiday");

      div.textContent = day;
      calendar.appendChild(div);
    }
  }

  // Ay geçiş butonları
  document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  // Türkiye Saati
  function updateTurkeyClock() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const turkeyTime = new Date(utc + (3 * 3600000));

    const hours = String(turkeyTime.getHours()).padStart(2, '0');
    const minutes = String(turkeyTime.getMinutes()).padStart(2, '0');
    const seconds = String(turkeyTime.getSeconds()).padStart(2, '0');

    document.getElementById("turkeyTime").textContent = `${hours}:${minutes}:${seconds}`;
  }

  setInterval(updateTurkeyClock, 1000);
  updateTurkeyClock();

  renderCalendar();
