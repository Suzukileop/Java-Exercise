package DSAJava.StructureDeControle;

public class conteurVoyelle {

    public static boolean isVoyelle(char c) {

        c = Character.toLowerCase(c);
        return c == 'a' ||  c == 'e' || c == 'i' || c == 'o' || c == 'y' || c == 'u';
    }

    public static void main(String[] args) {
        int nombreVoyelle = 0;
        String name = "Leopard julio cesar";

        for (int i = 0; i < name.length(); i++) {
            char voyelle = name.charAt(i);
            if (isVoyelle(voyelle) == true) {
                nombreVoyelle++;
            }
        }

        System.out.println("Nombre de voyelle da le texte \"" + name + "\" : " + nombreVoyelle);
    }
    
}
