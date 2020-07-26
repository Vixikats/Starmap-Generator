A simple star map generator that creates, names and connects an entire constellation of stars procedurally.

First the stars are randomly generated with their location and names. If they're too close to another star, it'll just generate a new location. This is so stars don't crowd too much.

Next, connections will be drawn starting with the star closest to the center of the map. All stars within a threshold radius (SYSTEM_DIST) of the origin star will be connected to it. This begins a list of all stars that are now "connected". Finally, the origin star will be added to a list of "finished" stars. It will then pick the first star in that list and connect it to its neighbors in the same way. Any neighbors that it's already connected to, i.e. the origin star, it will just ignore. Any new connections made by the next star will be added to the "connected" list and then once finished, that star will be added to the "finished" list. This continues until there are no more stars in the "connected" list, which will happen when: A) All stars have been finished. B) There are no more stars in range of any of the "connected" stars in order to propogate further. If there still exists stars that have not been connected, the algorithm finds the closest unused star to another connected star and then forces a connection between them. It then adds this star to the "connected" and stars the algorithm over again. Once completed, regardless of distances, all stars on the map will be connected.

This produces a contiguous connection of stars in a spider web like pattern. Travel between many stars on the edge would be extremely inefficient as many would have to path near the center of the map before moving back out to meet with its destination.

We solve this by evaluating the absolute distance between two stars and comparing that to the path distance created by the connections.

If the ratios of these distances are outside of a specified threshold (PATH_DIST_THRESHOLD), that POTENTIAL connection will be added to a list.

We add these connections to a different list because after evaluating every star pair, we want to find the potential connection that has the highest ratio between it and the actual path between the stars and then we make that a real connection.

After that, we have to reevaluate every other potential connection to check whether that connection we just added would have dropped its ratio below the threshold, thus making it unnecessary and able to be discarded.

Note, we only need to reevaluate the potential connections in the list and not the full list of all possible connections like we did at first.

Once we reevaluate the list again, we take the next potential connection with the highest ratio and make it a real conenction.

We repeat this process until there are no more potential connections and all have either been discarded or satisfied the criteria to become a valid connection.

The star map at this point is complete.

You can modify a few variables in the URI in order to change how the map is generated.

Set 'seed' to any integer to use a specific seed rather than any random one.
Use 'count' to modify the number of stars generated. (Default = 200)
Use 'path' to modify the ratio in which new connections are created to jump long paths. (Default = 5)
Use 'dist' to modify the distance that stars will be connected to one another automatically (Default = 1200)
