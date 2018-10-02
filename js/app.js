function getArtistName(){
  return document.getElementById("artist-name").value;
}

function getShowName(showName, artistName) {
  if(showName == undefined) {
    return "Last show for " + artistName;
  } else {
    return showName;
  };
}

function setShowDetails(obj) {
  let out = "<h2 class='h2 title-text'>" + getShowName(obj.info, obj.artist.name) + "</h2>" + 
    "<h3 class='lead'>Date: " + obj.eventDate + " at " + obj.venue.name + " in " + obj.venue.city.name + "</h3>";

  if(obj.sets.set[0] == undefined) {
    out = out + "<p>No songs are added to our database, sorry....</p>";
  } else {
    out = out + "<ul class='list-music text-center'>"
    obj.sets.set[0].song.forEach(element => {
      out = out + "<li>" + element.name + "</li>";
    });  
    out = out + "</ul>";
  };

  return out;
}

function setSearchHistory(termSearched) {
  let currentCount = Number(localStorage.getItem("currentCount")); 
  switch(currentCount) {
    case 0:
    localStorage.setItem("item0", termSearched);
      localStorage.setItem("currentCount", 1);        
      break;
    case 1:
      localStorage.setItem("item1", termSearched);
      localStorage.setItem("currentCount", 2);        
      break;
    case 2:
      localStorage.setItem("item2", termSearched);
      localStorage.setItem("currentCount", 0);        
      break;
  };  
}

function getSearchHistory() {
  let out = "<h3 class='title-text h3'>Last Setlists Searches</h3>" + "<ul class='search-history'>";

  var i;
  for (i = 0; i < 3; i++) {
    let currentItem = localStorage.getItem("item" + i);
    if(currentItem != null) {
      out = out + "<li><a href=\"javascript:getArtist('" + currentItem + "');\">" + currentItem + "</a></li>";
    };
  };
  out = out + "</ul>";

  return out;
}

function getArtistLastShow(artistID) {
  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      document.getElementById("lastShow").innerHTML = setShowDetails(obj);

      if (typeof(Storage) !== "undefined") {
        setSearchHistory(obj.artist.name);
        document.getElementById("lastSearches").innerHTML = getSearchHistory();
      } else {
        document.getElementById("lastSearches").innerHTML = "<p>Sorry! No Web Storage support..</p>";
      };      
    } else {
      if (this.readyState == 4 && this.status != 200) {
        document.getElementById("lastShow").innerHTML = "<h3>Not found.... try another artist</h3>";
      };
    };
  };
  
  url = "https://setlistfmapi.herokuapp.com/api/concerts?artist_id=" + artistID;
  xhttp.open("GET", url, true);
  xhttp.send();
}

function getArtist(artist) {
  var xhttp = new XMLHttpRequest();
  var artistName = "";

  if(artist == null) {
    artistName = getArtistName();
  } else {
    artistName = artist;
  };
  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var obj = JSON.parse(this.responseText);
      getArtistLastShow(obj.data.id);
    };
  };

  url = "https://setlistfmapi.herokuapp.com/api/artists?name=" + artistName;
  document.getElementById("lastShow").innerHTML = "<h3>Searching...</h3>";

  xhttp.open("GET", url, true);
  xhttp.send();
}
