let button = document.getElementById("button");
button.addEventListener("click", buttonUpdate);

let userTopic;
let url;

function buttonUpdate() {
  //store the data related to topic
  let topic = document.getElementById("topic");
  userTopic = topic.value;
  console.log(userTopic);

  //store the data related to date
  //   let date = document.getElementById("date");
  //   let userDate = date.value;
  //   date = new Date();

  // //format the date from string to object
  //   if(userDate === "yesterday"){
  //     date.setDate(date.getDate() - 1);
  //   } else if(userDate === "three days ago"){
  //     date.setDate(date.getDate() - 3);
  //   } else if(userDate === "a week ago"){
  //     date.setDate(date.getDate() - 7);
  //   }

  //extract infos from date and format for API
  // let year = String(date.getFullYear());
  // let month = String(date.getMonth() + 1);
  // if (month < 10) {
  //   month = "0" + month;
  // };
  // let day = String(date.getDate());
  // if (day < 10) {
  //   day = "0" + day;
  // };

  // let fullDate = `${year}-${month}-${day}`;
  // console.log(fullDate);

  //let url = 'https://newsdata.io/api/1/news?apikey=pub_11024b51bab49e5c0e5be61de5f0eb348afdb&language=fr,en&q=' + 'Apple' + '&from=' + fullDate + '&apiKey=f36578cbd49a4d378930151f1e3ac0d6';

  url =
    "https://newsdata.io/api/1/news?apikey=pub_1096463a00f38152b895f422ed9db51349ba9&language=fr,en&q=" +
    userTopic;

  fetchArticles();
}

//get latest article from API about user-chosen topic
async function fetchArticles() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.results[0].title);
  let title = data.results[0].title;
  let link = data.results[0].link;
  let pubDate = data.results[0].pubDate;
  let imageUrl = data.results[0].image_url;
  let description = data.results[0].description;
  let sourceId = data.results[0].source_id;
  console.log(imageUrl);
  let epochDate = new Date(pubDate);
  epochDate = epochDate.getTime();
  console.log(pubDate);
  console.log(epochDate);
  //if statement if parameter(s) is unavailable
  if (!imageUrl) {
    if (!description) {
      createABasicNotif(title, "Click the link to discover more!", epochDate);
    } else {
      createABasicNotif(title, description, epochDate);
    }
  } else {
    if (!description) {
      createAnImageNotif(
        title,
        "Click the link to discover more!",
        epochDate,
        "/images/icon.png"
      );
    } else {
      createAnImageNotif(title, description, epochDate, "/images/icon.png");
    }
  }
  readNow(link);
}
