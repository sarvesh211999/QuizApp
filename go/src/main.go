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
    ID int `json:"id"`
    FirstName string `json:"firstname"`
    LastName string `json:"lastname"`
    Email string `json:"email"`
    Password string `json:"password"`
}

func main() {

    db, err := gorm.Open("sqlite3","./quiz.db")
    
    if err != nil { 
        fmt.Println(err)
        fmt.Println("asdsad")
    }
  
    defer db.Close()
    db.AutoMigrate(&User{})

    r := gin.Default()
    r.POST("/signup",Register)
    r.Use((cors.Default()))
    r.Run(":8080")
   
}

func Register(c *gin.Context){
    fmt.Println("asdsad")
    var user User
    c.BindJSON
    c.Header("access-control-allow-origin", "*")
}