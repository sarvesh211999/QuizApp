package main

import (
    "fmt"
    "reflect" //finding the type of the variable (for testing)
    quiz"./quiz"
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "github.com/jinzhu/gorm"
    _"github.com/jinzhu/gorm/dialects/sqlite"  
)

var db *gorm.DB
var err error

type User struct {
    ID uint `json:"id"`
    FirstName string `json:"firstname"`
    LastName string `json:"lastname"`
    Email string `json:"email"`
    Password string `json:"password"`
}

type CheckUser struct {
    Email string `json:"email" gorm:"size:200;unique"`
    Password string `json:"password"`
}

type Status struct {
  Status string `json:"status"`
  Userid uint `json:"userid"`
}

func main() {

    db, err = gorm.Open("sqlite3","./quiz.db")
    
    if err != nil { 
        fmt.Println(err)
    }
  
    defer db.Close()
    db.AutoMigrate(&User{})
    db.AutoMigrate(&quiz.Quiz{})
    db.AutoMigrate(&quiz.QuizSet{})
    db.AutoMigrate(&quiz.Category{})
    db.AutoMigrate(&quiz.ScoreTable{})

    r := gin.Default()
    r.POST("/signup",Register)
    r.POST("/login",Login)
    r.POST("/addCategory",AddCategory)
    r.POST("/addQuiz/:name",AddQuiz)
    r.POST("/addQuestion",AddQuizQuestion)
    r.POST("/addScore",AddScore)
    r.GET("/allCategory",GetAllCategory)
    r.GET("/allQuiz",GetAllQuiz)
    r.GET("/getQuiz/:id",GetQuiz)
    r.Use((cors.Default()))
    r.Run(":8080")
   
}

func Register(c *gin.Context) {
    var user User
    c.BindJSON(&user)
    db.Create(&user)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, user)
}


func AddCategory(c *gin.Context) {
	var cat quiz.Category
	c.BindJSON(&cat)
	db.Create(&cat)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200,cat)
}

func AddQuiz(c *gin.Context) {
  name := c.Params.ByName("name")
  var user []User
    if err := db.Select("id").Find(&user).Error; err != nil {
       c.AbortWithStatus(404)
    } else {
      fmt.Println(reflect.ValueOf(user))
    for _, elem := range user {
        row := quiz.ScoreTable{UserId: int(elem.ID),QuizName: name,Attempted:0,Score:0}
        db.Create(&row)
    }

    c.JSON(200, user)
    }
}

func AddQuizQuestion(c *gin.Context) {
	var que quiz.Quiz
	c.BindJSON(&que)
	db.Create(&que)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200,que)
}

func GetQuiz(c *gin.Context) {
   id := c.Params.ByName("id")
   var quizName quiz.QuizSet
   var quizData []quiz.Quiz
   var name = ""

   if err := db.Select("Name").Where("id = ?", id).First(&quizName).Error; err != nil {
   		c.AbortWithStatus(404)
   } else {
   	fmt.Println(reflect.TypeOf(quizName)) 
   	name = quizName.Name
   }
   fmt.Println(name)
   if err := db.Where("quiz_name = ?", name).Find(&quizData).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, quizData)
   }
}

func GetAllCategory(c *gin.Context) {
	var categories []quiz.Category
	if err := db.Find(&categories).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, categories)
   }
}

func GetAllQuiz(c *gin.Context) {
	var quizAll []quiz.QuizSet
	if err := db.Find(&quizAll).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, quizAll)
   }
}

func AddScore(c *gin.Context) {
    var user quiz.ScoreTable
    c.BindJSON(&user)
    db.Create(&user)
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, user)
}


func Login(c *gin.Context) {
  var res CheckUser
  var status Status
  c.BindJSON(&res)
  var user User
  if err := db.Where("email = ?",res.Email).Find(&user).Error; err!= nil {
    c.Header("access-control-allow-origin", "*")
    status.Status = "Failure"
    status.Userid = 0
    c.JSON(200, status)
  } else {
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    if (res.Password == user.Password && res.Email == user.Email ){
      status.Status = "Success"
      status.Userid = user.ID
      c.JSON(200, status)  
    } else{
      status.Userid = 0
      status.Status = "Wrong Password"
     c.JSON(404, status)   
    }
  }

}
