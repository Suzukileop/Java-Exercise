

// comprehension pre-incrementation et post-incrementation
public class AutoIncrementation {
    public static void main(String[] args) {
        int pre = 5;
        int post = 5;

        System.out.println("Valeur initiale de pre :" + pre);
        System.out.println("Valeur initiale de post :" + post);

        System.out.println("");

        // usage de pre-incrementation 
        System.out.println("Pre : ajouter +1 avant d'avoir utiliser la valeur actuelle. ++pre = " + (++pre));
        System.out.println("Post : ajouter +1 avant d'avoir utiliser la valeur actuelle. post++ = " + (post++));
        System.out.println("Valeur de post apres avoir l'utiliser : " + post);

    }
}
