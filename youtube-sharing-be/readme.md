LIST OF API

POST
/register {email, passwrord} => {user, accessToken}
/login {email, passwrord} => {user, accessToken}

POST
/share {email, url} => {call youtubeAPI => {data video}}

GET
/list-video => {listVideo}

SOCKET
/notification => {videoId, sharedUser}

// GET
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id={ID_VIDEO}&key={API_KEY_YOUTUBE}

//DTO
// const snippet = {
// title:'',
// description: ''
// }

// const statistics = {
// viewCount: 3016373,
// likeCount: 10888,
// dislikeCount:0,
// favoriteCount: 0,
// commentCount: 548
// }
