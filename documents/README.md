Originalmente usaria diretamente a API https://api.setlist.fm, em que seria possível buscar todos os concertos de um artista ou banda, listando-os do último ao primeiro. Ao selecionar um dos concertos, seria exibida a setlist.

No entanto essa API impede requisição CORS, sendo assim foi criado um midleware, usando um plano free do Heroku, com informações limitadas. É possível buscar apenas o úlitimo show de cada artista ou banda e, ao clicar, exibir a setlist deste show específico.

https://setlistfmapi.herokuapp.com/api/artists?name=####

Pegue o id no retorno e terá na listagem do link abaixo os concertos realizados bem como o setlist.

https://setlistfmapi.herokuapp.com/api/concerts?artist_id=####

Ele para a aplicação a cada 30 minutos, ou seja na primeira chamada pode ser que o retorno demore alguns segundos. 




Not found - gracinha