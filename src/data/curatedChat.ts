import { Destination } from "../types";

export function generateCuratedChatReply(
  message: string,
  destination?: Destination
): string {
  const query = message.toLowerCase();
  const destName = destination?.name || "the world's most captivating destinations";
  const country = destination?.country || "Global";
  const bestTime = destination?.bestTimeToVisit || "Spring (April–May) and Autumn (September–October)";
  const landmarks = (destination?.famousPlaces || []).map((p) => p.name).join(", ");
  const culture = destination?.culture || "warm hospitality and rich cultural traditions";
  const currency = destination?.currency || "Local currency & major credit cards";
  const language = destination?.language || "Local language & English in hospitality areas";

  // 1. Beaches / Ocean / Islands
  if (
    query.includes("beach") ||
    query.includes("island") ||
    query.includes("swim") ||
    query.includes("ocean") ||
    query.includes("sand") ||
    query.includes("water")
  ) {
    return (
      `### Coastal & Waterscape Guide: ${destName}\n\n` +
      `For oceanfront serenity and coastal exploration in **${destName}**:\n\n` +
      `- **Best Time for Water Activities**: The calmest waters and clearest visibility occur during **${bestTime}**.\n` +
      `- **Coastal Highlights**: Look for sheltered coves, turquoise lagoons, and panoramic viewpoints overlooking the sea.\n` +
      `- **Insider Recommendation**: Head out in early morning (between 7:30 AM and 9:30 AM) when wind currents are gentle, sun glare is soft, and shorelines are peaceful.\n` +
      `- **Essential Gear**: Pack coral-safe mineral sunscreen, polarized UV sunglasses, and quick-drying water shoes for reef or pebble shores.\n\n` +
      `*Feel free to ask for a customized day-by-day seaside itinerary or local seafood recommendations!*`
    );
  }

  // 2. Packing / Luggage / What to wear
  if (
    query.includes("pack") ||
    query.includes("luggage") ||
    query.includes("wear") ||
    query.includes("clothing") ||
    query.includes("bring")
  ) {
    return (
      `### Packing Essentials: ${destName}, ${country}\n\n` +
      `To travel comfortably and respectfully in **${destName}**, here are recommended wardrobe & gear staples:\n\n` +
      `1. **Footwear**: Sturdy, broken-in walking shoes or breathable loafers for historic cobblestones and scenic trails.\n` +
      `2. **Clothing Layers**: Breathable linen or lightweight cotton for sunny afternoons, paired with a light windbreaker or evening knitwear.\n` +
      `3. **Cultural Respect**: When visiting sacred pavilions, historic temples, or traditional quarters, bring modest attire covering shoulders and knees.\n` +
      `4. **Electronics & Tech**: Universal travel plug adapter, portable compact power bank, and offline map downloads.\n` +
      `5. **Daily Carry**: A lightweight crossbody bag or daypack with RFID protection and a refillable insulated flask.\n\n` +
      `*The seasonal climate during the ideal travel window (${bestTime}) is generally moderate and radiant.*`
    );
  }

  // 3. Etiquette / Tipping / Cultural rituals
  if (
    query.includes("etiquette") ||
    query.includes("tip") ||
    query.includes("tipping") ||
    query.includes("culture") ||
    query.includes("polite") ||
    query.includes("custom")
  ) {
    return (
      `### Cultural Etiquette & Local Customs: ${destName}\n\n` +
      `Immersing yourself gracefully into **${destName}**'s heritage:\n\n` +
      `- **Atmosphere & Values**: The region is defined by ${culture}.\n` +
      `- **Tipping Guidelines**: In cafes and bistros, rounding up the bill or leaving 5%–10% for attentive service is customary in casual settings, while upscale venues may include a modest service fee.\n` +
      `- **Greetings & Demeanor**: A courteous greeting in the local tongue (**${language}**) when entering shops or dining establishments is warmly appreciated.\n` +
      `- **Photography Etiquette**: Always ask for permission before photographing local artisans, market vendors, or religious ceremonies.\n` +
      `- **Currency & Payments**: **${currency}** is standard. While contactless cards are widely accepted in central areas, keeping small denominations of cash on hand is helpful for local markets and transport.\n\n` +
      `*A respectful, unhurried mindset opens doors to authentic conversations and warm hospitality.*`
    );
  }

  // 4. Hidden Gems / Architecture / What to see
  if (
    query.includes("gem") ||
    query.includes("secret") ||
    query.includes("architect") ||
    query.includes("see") ||
    query.includes("visit") ||
    query.includes("landmark")
  ) {
    return (
      `### Architectural Highlights & Hidden Gems: ${destName}\n\n` +
      `Beyond the famous postcards, here is how to experience **${destName}** deeply:\n\n` +
      `- **Iconic Landmarks**: Don't miss exploring **${landmarks || "the historic center and premier viewpoints"}**.\n` +
      `- **The Golden Hour Strategy**: Settle into an elevated terrace or promenade 45 minutes before dusk to watch the city facades glow under amber light.\n` +
      `- **Hidden Quarters**: Venture two or three blocks behind the main plazas to discover family-run roasteries, artisanal workshops, and quiet courtyards.\n` +
      `- **Morning Exploration**: Walk the historic districts between 7:00 AM and 9:00 AM before tour groups arrive for serene photography and undisturbed streetscapes.\n\n` +
      `*Would you like a tailored 3-day or 5-day route covering both icons and quiet corners? Head to the AI Itinerary tab!*`
    );
  }

  // 5. Food / Dining / Culinary
  if (
    query.includes("food") ||
    query.includes("eat") ||
    query.includes("dish") ||
    query.includes("restaurant") ||
    query.includes("culinary") ||
    query.includes("dinner")
  ) {
    return (
      `### Gastronomic Journey: ${destName}\n\n` +
      `Tasting the authentic flavors of **${destName}**, ${country}:\n\n` +
      `- **Culinary Identity**: Fresh seasonal ingredients, regional spices, and centuries of culinary heritage.\n` +
      `- **Where to Eat**: Seek out bustling local morning markets and intimate neighborhood bistros where menus change with the morning harvest.\n` +
      `- **Dining Rhythms**: Lunch is often unhurried and relaxed; dinner times peak later in the evening with open-air terrace seating.\n` +
      `- **Insider Tip**: Ask for the seasonal chef's daily creation paired with regional vintages or artisanal tea.\n\n` +
      `*Every neighborhood in ${destName} has its own signature specialty waiting to be discovered.*`
    );
  }

  // 6. Duration / How long to stay
  if (
    query.includes("how long") ||
    query.includes("how many days") ||
    query.includes("duration") ||
    query.includes("days to spend") ||
    query.includes("time to spend") ||
    query.includes("length")
  ) {
    return (
      `### Ideal Stay Duration: ${destName}\n\n` +
      `To experience **${destName}** with an unhurried, enriching pace:\n\n` +
      `- **Recommended Stay**: **4 to 7 days** is the sweet spot. This allows you to explore major landmarks without rushing, while leaving ample room for spontaneous neighborhood wanders.\n` +
      `- **Quick Weekend / 3-Day Sprint**: Focus tightly on the historic core and top iconic sights.\n` +
      `- **Extended 7 to 10-Day Immersion**: Allows day excursions into surrounding valleys, coastal archipelagos, and quiet artisanal villages.\n\n` +
      `*Use the AI Itinerary tab to generate a day-by-day blueprint tailored to your preferred duration!*`
    );
  }

  // 7. Weather / Climate / Best time
  if (
    query.includes("weather") ||
    query.includes("climate") ||
    query.includes("season") ||
    query.includes("temperature") ||
    query.includes("rain") ||
    query.includes("when to go") ||
    query.includes("best time")
  ) {
    return (
      `### Seasonal & Climate Brief: ${destName}\n\n` +
      `Understanding the climate rhythms for **${destName}**, ${country}:\n\n` +
      `- **Peak Window**: **${bestTime}**.\n` +
      `- **Atmosphere**: Clear radiant skies, comfortable humidity, and optimal light for landscape and architectural photography.\n` +
      `- **Shoulder Season Advantage**: Arriving just before or after peak season offers lower accommodation rates, serene streets, and gentle weather.\n` +
      `- **Live Conditions**: Check the **Live Weather Hub** tab for current real-time temperature, humidity, and 5-day forecasts.\n\n` +
      `*Pack versatile layers to transition effortlessly from warm sunny afternoons to breezy twilight evenings.*`
    );
  }

  // 8. Budget / Cost / Currency
  if (
    query.includes("cost") ||
    query.includes("budget") ||
    query.includes("expensive") ||
    query.includes("price") ||
    query.includes("money") ||
    query.includes("currency")
  ) {
    return (
      `### Financial & Budget Guidance: ${destName}\n\n` +
      `Navigating expenses and payments in **${destName}**:\n\n` +
      `- **Official Currency**: **${currency}**.\n` +
      `- **Daily Estimates**:\n` +
      `  * *Value / Budget Explorer*: $70 – $120 USD / day (local bistros, public transport, boutique guesthouses)\n` +
      `  * *Comfort / Premium Traveler*: $160 – $280 USD / day (historic boutique hotels, guided highlights, fine dining)\n` +
      `  * *Luxury Living*: $450+ USD / day (private overwater suites, tailored private excursions, exclusive gastronomy)\n` +
      `- **Card vs. Cash**: Contactless cards are standard in central establishments, but keeping a modest reserve of local currency is essential for market stalls, small water taxis, or artisanal tips.\n\n` +
      `*Tip: Look for neighborhood bakeries and local lunch sets for Michelin-quality gastronomy at modest prices.*`
    );
  }

  // 9. Transport / Getting Around
  if (
    query.includes("transport") ||
    query.includes("getting around") ||
    query.includes("taxi") ||
    query.includes("flight") ||
    query.includes("train") ||
    query.includes("bus") ||
    query.includes("metro") ||
    query.includes("boat") ||
    query.includes("ferry")
  ) {
    return (
      `### Transit & Getting Around: ${destName}\n\n` +
      `Effortless movement across **${destName}**, ${country}:\n\n` +
      `- **Arrival**: Central transit hubs connect via high-speed rail, express highway coaches, or regional speedboats/seaplanes depending on terrain.\n` +
      `- **Local Mobility**: The central quarters are best discovered on foot. Cobblestones and waterfront promenades invite slow exploration.\n` +
      `- **Public Transit**: Reliable, clean, and punctual options exist across major routes. Download digital transit passes or tap-to-pay cards.\n` +
      `- **Private Rides & Taxis**: Licensed taxis and ride-hailing services are readily available; always confirm fares or verify the meter before departure.\n\n` +
      `*Traveler note: Allow extra transit buffer during peak morning hours (8:00 AM – 9:30 AM).*`
    );
  }

  // 10. Default Comprehensive Travel Insight
  return (
    `### Travel Curator Insights: ${destName}\n\n` +
    `Welcome to **${destName}**, ${country}! Here is your curator brief:\n\n` +
    `- **Atmosphere**: ${culture}\n` +
    `- **Best Window to Visit**: **${bestTime}** for ideal temperatures and vivid skies.\n` +
    `- **Key Landmarks**: ${landmarks || "Architectural monuments and scenic vistas"}.\n` +
    `- **Recommended Duration**: 4 to 7 days for a balanced pace between iconic sights and relaxed exploration.\n` +
    `- **Language & Currency**: ${language} • ${currency}\n\n` +
    `Ask me about specific neighborhood walks, packing advice, local etiquette, beaches, or dining rituals!`
  );
}
