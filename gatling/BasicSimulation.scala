/*
 * Copyright 2011-2021 GatlingCorp (https://gatling.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package computerdatabase

import scala.concurrent.duration._
import scala.util.Random
import io.gatling.core.Predef._
import io.gatling.http.Predef._

class BasicSimulation extends Simulation {

  val httpProtocol = http
    // Here is the root for all relative URLs
    .baseUrl("https://demo.tellimus.com")
    // Here are the common headers
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
    .doNotTrackHeader("1")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .acceptEncodingHeader("gzip, defusr/src/app/util/jwtUtil.js:8late")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0")

  // A scenario is a chain of requests and pauses
  val scn = scenario("Laua info")
    .exec(
      http("Laua info")
        .get("/api/table/111111")
    )
    .exec(
      http("Tootekategooriad")
        .get("/api/client/category")
    )
    .exec(
      http("Kõik tooted")
        .get("/api/menu")
        check(jsonPath("$[*]._id").findRandom.saveAs("randomItem"))
    )

    .pause(3)
      .exec(
        http("Esita tellimus")
          .post("/api/menu/order/add/111111")
          .body(StringBody("""{"${randomItem}":{"item":{"_id":"${randomItem}","__v":0},"amount":3}}""")).asJson
      )
    .pause(3)
    .exec(
      http("Kutsu teenindus")
        .post("/api/menu/order/add/111111/call-service/PAYMENT")
        .body(StringBody("""{"${randomItem}":{"item":{"_id":"${randomItem}","__v":0},"amount":3}}""")).asJson
    )

  setUp(
    scn.inject(
      nothingFor(4.seconds), // 1
//      atOnceUsers(10), // 2
//      rampUsers(10).during(5.seconds), // 3

        constantUsersPerSec(25).during(120.seconds), // 4
//      constantUsersPerSec(105).during(60.seconds), // 4

//      constantUsersPerSec(20).during(8.seconds).randomized, // 5
//      rampUsersPerSec(10).to(100).during(60.seconds), // 6
//      constantUsersPerSec(100).during(30.seconds), // 4
//      rampUsersPerSec(100).to(20).during(40.seconds).randomized, // 7
//      heavisideUsers(5000).during(100.seconds) // 8
    ).protocols(httpProtocol)
  )
}
