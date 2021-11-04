module.exports = function(RED) {

    "use strict";
    const BeaconScanner = require('./scanner.js');
    const scanner = new BeaconScanner();

    function BLEBeaconNodeControl(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        scanner.onadvertisement = (ad) => {
	    if(ad !== null)
	    {
                node.send({
                   payload: ad
                });
	    }
        };

        node.on('input', function(msg) {
            if (msg.payload){
                scanner.startScan().then(() => {
                    node.status({
                        fill: "green",
                        shape: "dot",
                        text: "Scanning Started"
                    });
                }).catch((error) => {
                    node.status({
                        fill: "red",
                        shape: "dot",
                        text: error
                    });
                });
            } else {
                scanner.stopScan();
                done();
            }
        });

        node.on('close', function(done) {
            scanner.stopScan();
            done();
        });
        
    }
    RED.nodes.registerType("BLE Beacon Scanner with Control",BLEBeaconNodeControl);

    function BLEBeaconNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        scanner.onadvertisement = (ad) => {
	    if(ad !== null)
	    {
                node.send({
                   payload: ad
                });
	    }
        };

        scanner.startScan().then(() => {
            node.status({
                fill: "green",
                shape: "dot",
                text: "Scanning Started"
            });
        }).catch((error) => {
            node.status({
                fill: "red",
                shape: "dot",
                text: error
            });
        });

        node.on('close', function(done) {
            scanner.stopScan();
            done();
        });
        
    }
    RED.nodes.registerType("BLE Beacon Scanner",BLEBeaconNode);
}



