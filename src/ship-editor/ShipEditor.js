import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    WebGLRenderer,
    Color,
    Scene,
    PerspectiveCamera,
    LineBasicMaterial,
    Geometry,
    Vector3,
    LineSegments,
    Group,
    VertexColors,
    BoxGeometry,
    MeshStandardMaterial,
    Mesh,
    AmbientLight,
    PointLight
} from 'three';
import EditorControls from './EditorControls'

class ShipEditor extends Component {

    componentDidMount() {
        const canvas = ReactDOM.findDOMNode(this);

        this.renderer = new WebGLRenderer({
            canvas
        });

        this.renderer.setClearColor(new Color( 0x030511 ));

        this.scene = new Scene();

        this.camera = new PerspectiveCamera( 75, 4/3, 1, 10000 );
        this.camera.position.z = 20;


        this.axisMaterial = new LineBasicMaterial({ color: 0xffffff , vertexColors: VertexColors});
        this.axisGeom = new Geometry();
        this.axisGeom.vertices.push(new Vector3(-10,0,0));
        this.axisGeom.vertices.push(new Vector3(10,0,0));
        this.axisGeom.vertices.push(new Vector3(0,-10,0));
        this.axisGeom.vertices.push(new Vector3(0,10,0));
        this.axisGeom.vertices.push(new Vector3(0,0,-10));
        this.axisGeom.vertices.push(new Vector3(0,0,10));
        this.axisGeom.colors = [
            new Color(0xff0000),
            new Color(0xff0000),
            new Color(0x00ff00),
            new Color(0x00ff00),
            new Color(0x0000ff),
            new Color(0x0000ff),
        ]

        this.axis = new LineSegments(this.axisGeom, this.axisMaterial);

        this.scene.add(this.axis);

        this.editorControls = new EditorControls(this.camera, this.renderer.domElement);


        this.shipRoot = new Group();
        this.scene.add(this.shipRoot);

        this.createGeometry();
        this.setupLighting();
        requestAnimationFrame(this.draw.bind(this));


    }

    draw() {

        requestAnimationFrame(this.draw.bind(this))

        this.renderer.render( this.scene, this.camera );
    }

    createGeometry() {
        var geometry = new BoxGeometry(1, 2, 3);
        var material = new MeshStandardMaterial();
        var cube = new Mesh(geometry, material);
        this.shipRoot.add(cube);
    }

    setupLighting() {
        var lights = new Group();

        var ambient = new AmbientLight(0x404040);
        lights.add(ambient);

        var right = new PointLight( 0xeeeeee, 1, 100, 2 );
        right.position.set( 50, 50, 0 );
        lights.add( right );

        var left = new PointLight( 0xeeeeee, 1, 100, 2 );
        left.position.set( -50, 50, 0 );
        lights.add( left );

        this.scene.add(lights);
    }

    render() {
        return (
            <canvas width="600" height="400"></canvas>
        )
    }
}

export default ShipEditor;
