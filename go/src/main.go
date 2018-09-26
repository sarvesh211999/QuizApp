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
    Role int `json:"role"`
}

type CheckUser struct {
    Email string `json:"email" gorm:"size:200;unique"`
    Password string `json:"password"`
}

type Status struct {
  Status string `json:"status"`
  Userid uint `json:"userid"`
  Name string `json:"username"`
  Role int `json:"role"`
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
    r.POST("/addQuiz/:name/:category",AddQuiz)
    r.POST("/addQuestion",AddQuizQuestion)
    r.POST("/addScore",AddScore)
    r.POST("/updateQues",UpdateQuestion)
    r.GET("/allCategory",GetAllCategory)
    r.GET("/allQuiz",GetAllQuiz)
    r.GET("/allScore",GetAllScore)
    r.GET("/allUser",GetAllUser)
    r.GET("/delete/:id",DeleteUser)
    r.GET("/deleteQues/:id",DeleteQuestion)
    r.GET("/getQuiz/:id",GetQuiz)
    r.GET("/getScore/:id",GetScore)
    r.GET("/totalScore",GetTotalScore)
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
  category := c.Params.ByName("category")
  var quiz2 = quiz.QuizSet{Name: name, Category: category}
  db.Create(&quiz2)
  var user []User
    if err := db.Select("id").Find(&user).Error; err != nil {
       c.AbortWithStatus(404)
    } else {
      fmt.Println(reflect.ValueOf(user))
    for _, elem := range user {
        row := quiz.ScoreTable{UserId: int(elem.ID),QuizName: name,Category: category,Attempted:0,Score:0}
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
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, quizData)
   }
}

func GetAllCategory(c *gin.Context) {
	var categories []quiz.Category
	if err := db.Find(&categories).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, categories)
   }
}

func GetAllQuiz(c *gin.Context) {
	var quizAll []quiz.QuizSet
	if err := db.Find(&quizAll).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, quizAll)
   }
}

func GetAllScore(c *gin.Context) {
  // var scoreAll []quiz.ScoreTable
  // if err := db.Find(&scoreAll).Error; err != nil {
  //     c.AbortWithStatus(404)
  //     fmt.Println(err)
  //  } else {
  //     c.Header("access-control-allow-origin", "*") 
  //     c.JSON(200, scoreAll)
  //  }
  type Result struct{
    Userid int
    Score int
    Name string
    Category string

  }
  var result []Result
  // db.Raw("select Email from users").Scan(&result)
  // fmt.Println(result)
  db.Raw("select score_tables.user_id as userid,sum(score_tables.score) as score,users.first_name as name ,score_tables.category from score_tables inner join users on users.id = score_tables.user_id group by score_tables.category, users.id order by score_tables.category, sum(score_tables.score) desc").Scan(&result)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200,result)

}

func GetAllUser(c *gin.Context) {
  var user []User
  if err := db.Find(&user).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, user)
   }

}

func GetTotalScore(c *gin.Context){
  type Result struct{
    Userid int
    Score int
    Name string
    Category string

  }
  var result []Result
  db.Raw("select score_tables.user_id as userid,sum(score_tables.score) as score,users.first_name as name ,score_tables.category from score_tables inner join users on users.id = score_tables.user_id group by users.id order by sum(score_tables.score) desc").Scan(&result)
  c.Header("access-control-allow-origin", "*")
  c.JSON(200,result)
  


}

func AddScore(c *gin.Context) {
    var user quiz.ScoreTable
    var toAdd quiz.ScoreTable
    c.BindJSON(&user)
    fmt.Println(user.UserId,user.QuizName)
    // if err := db.Where("user_id = ? AND quiz_name = ?", user.UserId,user.QuizName).Find(&toAdd).Error; err != nil {
    //   c.AbortWithStatus(404)
    //   fmt.Println(err)
    // }
    //error handling remaningi 
    db.Model(&toAdd).Where("user_id = ? AND quiz_name = ?", user.UserId,user.QuizName).Update("attempted", user.Attempted) 
    db.Model(&toAdd).Where("user_id = ? AND quiz_name = ?", user.UserId,user.QuizName).Update("score", user.Score) 
    c.Header("access-control-allow-origin", "*")
    c.JSON(200, toAdd)
}

func GetScore(c *gin.Context) {
  var score []quiz.ScoreTable
  id := c.Params.ByName("id")
  if err := db.Where("user_id = ?",id).Find(&score).Error; err!=nil {
    c.AbortWithStatus(404)
    fmt.Println(err)
  } else {
    c.Header("access-control-allow-origin", "*")
    c.JSON(200,score)
    
  }
}

func DeleteUser(c *gin.Context) {
  id := c.Params.ByName("id")
  db.Where("id = ?",id).Delete(User{})
  db.Where("user_id = ?",id).Delete(quiz.ScoreTable{})
  c.Header("access-control-allow-origin", "*")
  c.JSON(200,"Success")
  
}

func DeleteQuestion(c *gin.Context) {
  id := c.Params.ByName("id")
  fmt.Println(id)
  db.Where("id = ?",id).Delete(quiz.Quiz{})
  c.Header("access-control-allow-origin", "*")
  c.JSON(200,"Success")
  
}

func UpdateQuestion(c *gin.Context){
  var quizt quiz.Quiz
  var data quiz.Quiz
  c.BindJSON(&data)
  fmt.Println(data)
  db.Model(&quizt).Where("id = ?",data.ID).UpdateColumns(quiz.Quiz{Question:data.Question,Option1:data.Option1,Option2:data.Option2,Option3:data.Option3,Option4:data.Option4,Answer: data.Answer})
  c.Header("access-control-allow-origin", "*")
  c.JSON(200,"Success")

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
    c.Header("access-control-allow-origin", "*")
    if (res.Password == user.Password && res.Email == user.Email ){
      status.Status = "Success"
      status.Userid = user.ID
      status.Name = user.FirstName + " " + user.LastName
      status.Role = user.Role
      c.JSON(200, status)  
    } else{
      status.Userid = 0
      status.Status = "Wrong Password"
     c.JSON(404, status)   
    }
  }

}
