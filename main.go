package main

import(
	"fmt"
	"log"
	"encoding/json"
	"math/rand"
	"net/http"
	"strconv"
	// Importing the Gorilla Mux router package
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
)

type Movie struct{
	ID string `json:"id"`
	Isbn string `json:"isbn"`
	Title string `json:"title"`
	Director *Director `json:"director"`
}

type Director struct{
	FirstName string `json:"firstname"`
	LastName string `json:"lastname"`
}
// Declaring a slice to store all movies in memory
var movies []Movie

func getMovies(w http.ResponseWriter,r *http.Request){
	w.Header().Set("Content-Type","application/json") // Set response content type to JSON
	json.NewEncoder(w).Encode(movies) // Encode - Encode: Prepare the data in the right format. convert into the json format and send the movies slice
}

func deleteMovies(w http.ResponseWriter,r *http.Request){
	w.Header().Set("Content-type","application/json")
	// Extracts all path variables from the request URL as a map[string]string.
	params := mux.Vars(r)

	for index,item := range movies {
		if item.ID == params["id"] {
			//"Take all movies before the one to delete, skip it, then take all movies after it — and stitch them together."
			movies = append(movies[:index],movies[index+1:]...)
			break
		}
}

	json.NewEncoder(w).Encode(movies) 
}

func getMovieById(w http.ResponseWriter,r *http.Request){
	w.Header().Set("Content-Type","application/json")
	params := mux.Vars(r)

	for _,item := range movies{
		if item.ID == params["id"]{
				json.NewEncoder(w).Encode(item) // Encode the specific movie item
				return
			}
			
	}
}

func createMovies(w http.ResponseWriter,r *http.Request){
	 w.Header().Set("Content-Type","application/json")
	var movie Movie 
	//decoding from the body
	_ = json.NewDecoder(r.Body).Decode(&movie)

	movie.ID = strconv.Itoa(rand.Intn(1000000))
	movies = append(movies, movie)
	json.NewEncoder(w).Encode(movie)
}

func updateMovies(w http.ResponseWriter,r *http.Request){
	//we are just doing the things for the sake of learning as we are not playing with the databases

	//set the json content type
	w.Header().Set("Content-Type","application/json")

	//params
	params := mux.Vars(r)
	
	//delete the movie from the with id that we are getting from the params
	//add the new movie -  the movie that we have send in the body


	for index ,item := range movies{
		if item.ID == params["id"]{
			movies = append(movies[:index],movies[index+1:]...)
			var movie Movie  
			_ = json.NewDecoder(r.Body).Decode(&movie)

			movie.ID = item.ID
			movies = append(movies, movie)

			json.NewEncoder(w).Encode(movie) // Encode the updated movie item
			return
		}
	}
}

func main(){
	r := mux.NewRouter()

	movies = append(movies, Movie{ID:"1",Isbn : "4328",Title: "Movie One", Director: &Director{FirstName: "John", LastName: "Doe"}})

	movies = append(movies, Movie{ID:"2",Isbn : "4323",Title: "Movie Two", Director: &Director{FirstName: "Mervic", LastName: "Devis"}})

	r.HandleFunc("/movies",getMovies).Methods("GET")
	r.HandleFunc("/movies/{id}",getMovieById).Methods("GET")
	r.HandleFunc("/movies",createMovies).Methods("POST")
	r.HandleFunc("/movies/{id}",updateMovies).Methods("PUT")
	r.HandleFunc("/movies/{id}",deleteMovies).Methods("DELETE")

	fmt.Printf("Starting the server at port :5000\n")

    corsHandler := handlers.CORS(
        handlers.AllowedOrigins([]string{"http://localhost:5000", "http://localhost:5173"}),
        handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
        handlers.AllowedHeaders([]string{"Content-Type"}),
    )

	log.Fatal(http.ListenAndServe(":5000",corsHandler(r)));
}