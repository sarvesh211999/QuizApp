package main

import (
    "fmt"
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

func main() {

    db, err = gorm.Open("sqlite3","./quiz.db")
    
    if err != nil { 
        fmt.Println(err)
    }
  
    defer db.Close()
    db.AutoMigrate(&User{})

    r := gin.Default()
    r.POST("/signup",Register)
    r.Use((cors.Default()))
    r.Run(":8080")
   
}

func Register(c *gin.Context) {
    var user User
    c.BindJSON(&user)
    db.Create(&user)
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200, user)
}