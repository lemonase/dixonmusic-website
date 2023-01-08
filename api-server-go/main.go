package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	fiberApp := fiber.New()

	fiberApp.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World!")
	})

	fiberApp.Get("/inventory", func(c *fiber.Ctx) error {
		var userName string = "dixonmusic"
		var url string = fmt.Sprintf("https://api.discogs.com/users/%s/inventory?token=%s", userName, os.Getenv("DIXONMUSIC_API_TOKEN"))

		log.Println(url)

		res, err := http.Get(url)
		if err != nil {
			log.Fatalln(err)
		}

		defer res.Body.Close()

		body, err := ioutil.ReadAll(res.Body)
		if err != nil {
			log.Fatalln(err)
		}

		return c.SendString(string(body))
	})

	log.Fatal(fiberApp.Listen(":3000"))
}
