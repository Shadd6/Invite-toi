import { useState, useEffect } from "react";


import "./styles.css";

const Invite = () => {
  const targetDate = new Date("2025-05-02T18:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState("");
  const [wishIndex, setWishIndex] = useState(0);

  // Список пожеланий
  const wishes = [
    { name: "Марат-Ажар", note: "Жақсы тілекпен,", text: "Бақыт, шаттық, ұзақ ғұмыр тілейміз!" },
    { name: "Айгүл-Ерлан", note: "Жүректен шыққан сөз,", text: "Отбасыңызға татулық пен молшылық!" },
    { name: "Самат-Гүлмира", note: "Шын жүректен,", text: "Қуанышты күндеріңіз көп болсын!" },
    { name: "Нұржан-Айжан", note: "Құрметпен,", text: "Бір-біріңізді әрдайым қолдаңыздар!" },
  ];

  useEffect(() => {
    // Таймер обратного отсчёта
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft("Той басталды!");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(`${days} күн ${hours} сағат ${minutes} минут ${seconds} секунд`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="invite-container">
      {/* Фото семьи */}
      <img src="/images/Photo-top.jpg" alt="Қанатбектің отбасы" className="family-photo" />

      {/* Текст приглашения */}
      <h1>Құрметті қонақтар!</h1>
      <p className="invite-text">
        Сіз(дер)ді Қанатбектің 50 жас мерей тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз.
      </p>

      {/* Карточка с информацией */}
      <div className="container card">
        <h2>Той жайлы</h2>
        <p><strong>Той иелері:</strong> Қанатбек пен оның жұбайы Асель</p>
        <p><strong>Тойдың басталу уақыты:</strong> 02.05.2025 / сағат 18:00</p>

        {/* Отсчет времени */}
        <h3>Тойдың басталуына қалды:</h3>
        <p className="countdown">{timeLeft}</p>

        {/* Адрес перед картой */}
        <h3>Мекен-жайы:</h3>
        <p>Ресторан "Beis Grand Hall", Гүлдала, ул. Акбидай, 1а</p>

        {/* Карта */}
        <iframe
          src="https://www.google.com/maps?q=43.35612776481399, 77.07046041952957&output=embed"
          allowFullScreen
          loading="lazy"
        ></iframe>

        {/* Кнопка "Открыть на карте" */}
        <button onClick={() => window.open("https://maps.app.goo.gl/srHJ83NweAXA2brB7", "_blank")}>
          Открыть на карте
        </button>
      </div>

         

      {/*  Пожелания (Карусель)  */}
      <div className="container wishes">
        <h2>Қонақтардың тілектері</h2>
        
        {/* Пожелание */}
        <p className="wish-name">{wishes[wishIndex].name}</p>
        <p className="wish-note">{wishes[wishIndex].note}</p>
        <p className="wish-text">{wishes[wishIndex].text}</p>

        {/* Карусель управления */}
        <div className="carousel-controls">
          <button className="arrow-btn" onClick={() => setWishIndex((wishIndex - 1 + wishes.length) % wishes.length)}>⬅</button>

          {/* Радио-кнопки */}
          <div className="radio-buttons">
            {wishes.map((_, idx) => (
              <input
                key={idx}
                type="radio"
                checked={wishIndex === idx}
                onChange={() => setWishIndex(idx)}
              />
            ))}
          </div>

          <button className="arrow-btn" onClick={() => setWishIndex((wishIndex + 1) % wishes.length)}>➡</button>
        </div>
      </div>
    </div>
  );
};

export default Invite;
