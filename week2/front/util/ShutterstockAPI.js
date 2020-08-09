class ShutterstockAPI {
  constructor() {}

  getAudio(mood) {
    let url = `https://api.shutterstock.com/v2/audio/search`;
    let token = `v2/QTZreFZxR0ZRU3lpbHI2QkFETlFlSGhGTEczR3ZZUkMvMjc0NTAxOTIxL2N1c3RvbWVyLzMvMzBJVU9zVGdLTXpiY0F3UWNIdnNCRXJrMWt4MG5Bak5TVWtNSnpWc3BiNEJ6OUtZajZUaFdzSHZFUWNxOEJLcjc4NG05ZXNva3BHb2w0a2Q3dXdsWi12STV2dC16SnJERWVkN24yZXBsa3d5cm1QdnpWdnZQM2JsSFgzUEZHTkJQVWZZZG1KbjZvUElKLUhzQUI1VWQxQ041am9WZHNPOEVUckJnSUg5Yk1tNFhjRmMzMmgxcHRqM2cwNlVJcTI2enZhYjBvTjRfdThXYmtFa3pTVkh1QQ`;
    // token은 J112 개인키입니다.

    return axios.get(url, {
      params : {moods : mood}, 
      headers: { 'Authorization' : `Bearer ${token}`}
    }).catch(error => console.log(`shutterstock error : ${error}`))
  }
}
