import QuizTopic from "../components/QuizTopic";

const QuizTopics = () => {
    return (
        <>
            <div className="flex flex-row flex-wrap justify-center mb-7 mt-2">
            <QuizTopic image = "/images/music.png" text = "MUSIC" category = {"Music"} imageBg = {"/images/musicBg.png"}/>
            <QuizTopic image = "/images/sport_and_leisure.png" text = "SPORT AND LEISURE" category = {"Sport & Leisure"} imageBg = {"/images/sport_and_leisureBg.png"}/>
            <QuizTopic image = "/images/film_and_tv.png" text = "FILM AND TV" category = {"Film & TV"} imageBg = {"/images/film_and_tvBg.png"}/> 
            <QuizTopic image = "/images/arts_and_literature.png" text = "ARTS AND LITERATURE" category={"Arts & Literature"} imageBg = {"/images/arts_and_literatureBg.png"}/>
            <QuizTopic image = "/images/history.png" text = "HISTORY" category={"History"} imageBg = {"/images/historyBg.png"}/>
            <QuizTopic image = "/images/society_and_culture.png" text = "SOCIETY AND CULTURE" category={"Society & Culture"} imageBg = {"/images/society_and_cultureBg.png"}/>
            <QuizTopic image = "/images/science.png" text = "SCIENCE" category={"Science"} imageBg = {"/images/scienceBg.png"}/>
            <QuizTopic image = "/images/geography1.png" text = "GEOGRAPHY" category={"Geography"} imageBg = {"/images/geography1Bg.png"}/>
            <QuizTopic image = "/images/food_and_drink.png" text = "FOOD AND DRINK" category={"Food & Drink"} imageBg = {"/images/food_and_drinkBg.png"}/>
            <QuizTopic image = "/images/general_knowledge.png" text = "GENERAL KNOWLEDGE" category={"General Knowledge"} imageBg = {"/images/general_knowledgeBg.png"}/>
            </div>
        </>
    )
}

export default QuizTopics;