let playerX = 2
let playerY = 2

let targetX = 0
let targetY = 0

let score = 0
let gameSpeed = 800

// Spawn target at random position
function spawnTarget() {
    targetX = Math.randomRange(0, 4)
    targetY = Math.randomRange(0, 4)
}

// Draw everything
function render() {
    basic.clearScreen()
    led.plot(targetX, targetY)
    led.plot(playerX, playerY)
}

// Move target over time (pressure mechanic)
basic.forever(function () {
    basic.pause(gameSpeed)
    spawnTarget()

    // Difficulty ramp 🔥
    if (gameSpeed > 300) {
        gameSpeed -= 10
    }
})

// Controls: move crosshair
input.onButtonPressed(Button.A, function () {
    // SHOOT 🎯
    if (playerX == targetX && playerY == targetY) {
        score += 1
        basic.showIcon(IconNames.Happy)
        basic.pause(200)
    } else {
        basic.showIcon(IconNames.Sad)
        basic.pause(200)
    }

    basic.showNumber(score)
})

// Move crosshair with tilt (better gameplay)
input.onGesture(Gesture.TiltLeft, function () {
    playerX = Math.max(0, playerX - 1)
})

input.onGesture(Gesture.TiltRight, function () {
    playerX = Math.min(4, playerX + 1)
})

input.onGesture(Gesture.LogoUp, function () {
    playerY = Math.max(0, playerY - 1)
})

input.onGesture(Gesture.LogoDown, function () {
    playerY = Math.min(4, playerY + 1)
})

// Game loop render
basic.forever(function () {
    render()
    basic.pause(100)
})