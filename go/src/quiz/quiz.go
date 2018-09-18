package quiz

type Category struct {
   ID uint `json:"id"`
   Name string `json:"category"`  
}

type QuizSet struct {
   ID int `json:"id"`
   Name string `json:"quizname"`  
   Category string `json:"category"`  
}

type Quiz struct {
    ID uint `json:"id"`
    QuizName string `json:"quizname"`
    Question string `json:"question"`
    Option1 string `json:"option1"`
    Option2 string `json:"option2"`
    Option3 string `json:"option3"`
    Option4 string `json:"option4"`
    Answer int `json:"answer"`
}
