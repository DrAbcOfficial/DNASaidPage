let SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
let container;
let camera, scene, renderer;
let particles, particle, count = 0;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 1;
init();
animate();
function init() {
    container = document.createElement( 'div' );
    container.id = 'wall-bg';
    document.body.appendChild( container );
    overlay = document.createElement( 'span' );
    container.appendChild(overlay);
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;
    scene = new THREE.Scene();
    particles = new Array();
    let PI2 = Math.PI * 2;
    let material = new THREE.ParticleCanvasMaterial( {
        color: '#666666',
        program: function ( context ) {
            context.beginPath();
            context.arc( 0, 0, 1, 0, PI2, true );
            context.fill();
        }
    });
    let i = 0;
    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
        for ( let iy = 0; iy < AMOUNTY; iy ++ ) {

            particle = particles[ i ++ ] = new THREE.Particle( material );
            particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
            particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
            scene.add( particle );
        }
    }
    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
function onDocumentTouchMove( event ) {
    if ( event.touches.length === 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}
function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    let i = 0;
    for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
        for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
            particle = particles[ i++ ];
            particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
            particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;
        }
    }
    renderer.render( scene, camera );
    count += 0.08;
}