package com.ejemplo.eliza.service;

import com.ejemplo.eliza.model.Message;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ElizaService {

    private final Random random = new Random();
    private String ultimaRespuesta = "";

    // Reflexion de pronombres
    private static final Map<String, String> REFLEJOS = Map.of(
            "yo", "tu",
            "mi", "tu",
            "mis", "tus",
            "soy", "eres",
            "estoy", "estas",
            "me", "te"
    );

    private record Rule(Pattern pattern, List<String> responses) {
    }

    // Reglas sobre texto en minusculas y sin tildes
    private final List<Rule> rules = List.of(
            // Saludos
            new Rule(Pattern.compile(".*\\b(hola|buenos dias|buenas tardes|buenas noches|buenas)\\b.*"),
                    List.of(
                            "Hola, que tal estas hoy?",
                            "Hola, me alegra saludarte. De que quieres hablar?",
                            "Buenas, como te sientes en este momento?"
                    )),
            // Despedidas
            new Rule(Pattern.compile(".*\\b(adios|hasta luego|nos vemos|chao)\\b.*"),
                    List.of(
                            "Hasta luego, espero que nuestra charla te haya ayudado.",
                            "Adios, cuidate mucho y vuelve cuando quieras.",
                            "Nos vemos pronto, que tengas un buen dia."
                    )),
            // Nombre
            new Rule(Pattern.compile(".*\\bme llamo (\\w+).*"),
                    List.of(
                            "Encantada de conocerte, $1. Como te sientes hoy?",
                            "Hola $1, es un placer hablar contigo. Que te preocupa?"
                    )),
            // Estados de animo
            new Rule(Pattern.compile(".*\\bestoy (.+)"),
                    List.of(
                            "Por que estas $1?",
                            "Desde cuando estas $1?",
                            "Que crees que hace que estes $1?"
                    )),
            new Rule(Pattern.compile(".*\\bme siento (.+)"),
                    List.of(
                            "Que te hace sentirte $1?",
                            "Con que frecuencia te sientes $1?"
                    )),
            // Necesito / Quiero / Creo
            new Rule(Pattern.compile(".*\\bnecesito (.+)"),
                    List.of(
                            "Por que necesitas $1?",
                            "Realmente te ayudaria conseguir $1?",
                            "Que pasaria si no tuvieras $1?"
                    )),
            new Rule(Pattern.compile(".*\\bquiero (.+)"),
                    List.of(
                            "Que significaria para ti conseguir $1?",
                            "Por que quieres $1?",
                            "Que harias si obtuvieras $1?"
                    )),
            new Rule(Pattern.compile(".*\\bcreo (.+)"),
                    List.of(
                            "Por que crees $1?",
                            "Tienes alguna duda sobre si $1?",
                            "Que te lleva a pensar $1?"
                    )),
            // No se
            new Rule(Pattern.compile(".*\\bno se\\b.*"),
                    List.of(
                            "Piensalo con calma, que es lo primero que se te ocurre?",
                            "Es normal no estar seguro a veces. Intenta explicarlo con tus palabras.",
                            "Por que crees que te cuesta decidirlo?"
                    )),
            // Familia y entorno
            new Rule(Pattern.compile(".*\\b(madre|padre|familia|pareja|trabajo)\\b.*"),
                    List.of(
                            "Hablame mas de tu $1.",
                            "Como es tu relacion con tu $1?"
                    )),
            // Porque y no puedo
            new Rule(Pattern.compile(".*\\bporque (.+)"),
                    List.of(
                            "Es esa la verdadera razon?",
                            "Que otras razones se te ocurren?"
                    )),
            new Rule(Pattern.compile(".*\\bno puedo (.+)"),
                    List.of(
                            "Por que crees que no puedes $1?",
                            "Que pasaria si pudieras $1?"
                    )),
            // Si y No
            new Rule(Pattern.compile("^si$|^si[,\\s].*"),
                    List.of(
                            "Pareces muy seguro. Por que dices que si?",
                            "Entiendo. Puedes explicarme un poco mas sobre eso?"
                    )),
            new Rule(Pattern.compile("^no$|^no[,\\s].*"),
                    List.of(
                            "Por que dices que no?",
                            "Prefieres no hablar de ello o hay otro motivo?"
                    ))
    );

    private final List<String> defaults = List.of(
            "Cuentame mas.",
            "Entiendo. Y eso como te hace sentir?",
            "Continua, te escucho.",
            "Me parece interesante, puedes darme mas detalles?"
    );

    private final List<String> respuestasVacias = List.of(
            "No has escrito nada. Dime que tienes en mente.",
            "El mensaje esta vacio. Escribe algo para que podamos conversar."
    );

    private final List<String> respuestasCortas = List.of(
            "Has escrito muy poco, cuentame un poco mas.",
            "Necesito alguna palabra mas para poder entenderte mejor."
    );

    public String respond(String input, List<Message> history) {
        // 5. Responder de forma adecuada a mensajes vacios o muy cortos
        if (input == null || input.trim().isEmpty()) {
            return elegirSinRepetir(respuestasVacias);
        }

        // 4. Ignorar mayusculas y tildes
        String limpio = limpiarTexto(input.trim());

        if (limpio.length() <= 2 && !limpio.equals("si") && !limpio.equals("no")) {
            return elegirSinRepetir(respuestasCortas);
        }

        // 3. Evaluar las reglas
        for (Rule rule : rules) {
            Matcher m = rule.pattern().matcher(limpio);
            if (m.matches()) {
                String template = elegirSinRepetir(rule.responses());
                if (m.groupCount() >= 1 && m.group(1) != null) {
                    template = template.replace("$1", reflect(m.group(1)));
                }
                ultimaRespuesta = template;
                return template;
            }
        }

        // Si ninguna regla coincide, usar memoria o respuesta por defecto
        String respuesta = recall(history).orElseGet(() -> elegirSinRepetir(defaults));
        ultimaRespuesta = respuesta;
        return respuesta;
    }

    // Elimina tildes y convierte a minusculas
    private String limpiarTexto(String texto) {
        String normalizado = Normalizer.normalize(texto.toLowerCase(), Normalizer.Form.NFD);
        return normalizado.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
    }

    // 2. Evita repetir la misma respuesta dos veces seguidas
    private String elegirSinRepetir(List<String> opciones) {
        if (opciones.size() == 1) {
            ultimaRespuesta = opciones.get(0);
            return ultimaRespuesta;
        }
        String elegida = opciones.get(random.nextInt(opciones.size()));
        int intentos = 0;
        while (elegida.equals(ultimaRespuesta) && intentos < 10) {
            elegida = opciones.get(random.nextInt(opciones.size()));
            intentos++;
        }
        ultimaRespuesta = elegida;
        return elegida;
    }

    private static final Pattern NOMBRE = Pattern.compile("\\bme llamo (\\w+)", Pattern.CASE_INSENSITIVE);
    private static final Pattern TEMA = Pattern.compile("\\bmi (madre|padre|familia|pareja|trabajo)\\b", Pattern.CASE_INSENSITIVE);

    private Optional<String> recall(List<Message> history) {
        String nombre = null;
        String tema = null;

        for (Message msg : history) {
            if (!"user".equals(msg.getSender()) || msg.getText() == null) continue;
            Matcher n = NOMBRE.matcher(msg.getText());
            if (n.find()) nombre = n.group(1);
            Matcher t = TEMA.matcher(msg.getText());
            if (t.find()) tema = t.group(1);
        }

        if (random.nextInt(3) != 0) return Optional.empty();

        if (tema != null) {
            String saludo = nombre != null ? nombre + ", antes" : "Antes";
            String recuerdo = saludo + " mencionaste a tu " + tema + ". Tiene relacion con esto?";
            if (!recuerdo.equals(ultimaRespuesta)) {
                return Optional.of(recuerdo);
            }
        }
        if (nombre != null) {
            String recuerdoNombre = "Sigo aqui, " + nombre + ". Continua.";
            if (!recuerdoNombre.equals(ultimaRespuesta)) {
                return Optional.of(recuerdoNombre);
            }
        }
        return Optional.empty();
    }

    private String reflect(String text) {
        return Arrays.stream(text.split(" "))
                .map(w -> REFLEJOS.getOrDefault(w.toLowerCase(), w))
                .collect(Collectors.joining(" "));
    }
}
