import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CityManager } from './Services/CityManager.service';
import { City } from './Classes/City';
import { AreaManager } from './Services/AreaManager.service';
import { Area } from './Classes/Areas/Area';
import { FlatArea } from './Classes/Areas/FlatArea';


async function bootstrap() {
  for (let i = 0; i < 5; i++) {
    AreaManager.AreaList.push(new FlatArea(4, null));
  }
  //adjacents erstellen
  AreaManager.AreaList[0].setAdjacentArea([AreaManager.AreaList[1], AreaManager.AreaList[2]]);
  AreaManager.AreaList[1].setAdjacentArea([AreaManager.AreaList[0], AreaManager.AreaList[2], AreaManager.AreaList[3]]);
  AreaManager.AreaList[2].setAdjacentArea([AreaManager.AreaList[0], AreaManager.AreaList[2], AreaManager.AreaList[3]]);
  AreaManager.AreaList[3].setAdjacentArea([AreaManager.AreaList[1], AreaManager.AreaList[2]]);

  var mainCity: City = new City(100,100, AreaManager[0]);
  CityManager.CityList.push(mainCity);
  
  const app = await NestFactory.create(AppModule);
  var intervalId = setInterval(function() {
    CityManager.tickOnAllAreas();
  }, 5000);
  await app.listen(3000);
}
bootstrap();
